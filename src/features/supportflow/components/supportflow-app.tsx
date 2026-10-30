"use client";

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type PaginationState, type SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "../../../components/ui/icon";
import { addComment, createTicket, updateTicket } from "../domain/ticket-workflows";
import { calculateAnalytics } from "../domain/analytics";
import { commentSchema, type TicketInput } from "../domain/schemas";
import { parseTicketUrlState, serializeTicketUrlState, type TicketUrlState } from "../domain/url-state";
import type { Customer, SupportData, TeamMember, Ticket, TicketPriority, TicketStatus } from "../domain/types";
import { supportRepository } from "../data/repository";
import { TicketForm } from "./ticket-form";
import { useDialogAccessibility } from "./use-dialog-accessibility";

type View = "overview" | "tickets" | "customers" | "team" | "analytics";

const navigation: { id: View; label: string; icon: "grid" | "inbox" | "users" | "spark" }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "tickets", label: "Tickets", icon: "inbox" },
  { id: "customers", label: "Customers", icon: "users" },
  { id: "team", label: "Team", icon: "users" },
  { id: "analytics", label: "Analytics", icon: "spark" },
];

const locationChangeEvent = "supportflow:urlchange";

function subscribeToLocation(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", listener);
  window.addEventListener(locationChangeEvent, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(locationChangeEvent, listener);
  };
}

function getLocationSearch() {
  return typeof window === "undefined" ? "" : window.location.search;
}

function getServerLocationSearch() {
  return "";
}

function writeLocation(view: View, ticketState: TicketUrlState, pushHistory: boolean) {
  const params = new URLSearchParams(window.location.search);
  params.set("view", view);
  const ticketParams = new URLSearchParams(serializeTicketUrlState(ticketState));
  for (const key of ["q", "status", "priority", "assignee", "sort", "direction", "page", "pageSize"]) {
    const value = ticketParams.get(key);
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  if (pushHistory) window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(locationChangeEvent));
}

const statusClass: Record<TicketStatus, string> = {
  Open: "open",
  "In progress": "progress",
  Waiting: "waiting",
  Resolved: "resolved",
};

const priorityClass: Record<TicketPriority, string> = {
  Urgent: "urgent",
  High: "high",
  Normal: "normal",
  Low: "low",
};

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function getCustomer(data: SupportData, id: string) {
  return data.customers.find((customer) => customer.id === id);
}

function getMember(data: SupportData, id: string) {
  return data.team.find((member) => member.id === id);
}

function StatusBadge({ status }: { status: TicketStatus }) {
  return <span className={`sf-badge sf-status ${statusClass[status]}`}><i />{status}</span>;
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <span className={`sf-priority ${priorityClass[priority]}`}><i />{priority}</span>;
}

function Avatar({ member, size = "normal" }: { member?: TeamMember; size?: "normal" | "large" }) {
  return <span className={`sf-avatar ${size === "large" ? "large" : ""}`} style={{ background: member?.color ?? "#527a69" }} aria-label={member?.name}>{member?.initials ?? "?"}</span>;
}

function PageTitle({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail: string; action?: ReactNode }) {
  return <div className="sf-page-title"><div><p className="sf-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="sf-muted">{detail}</p></div>{action}</div>;
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="sf-search"><Icon name="search" size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /><span className="sf-shortcut">⌘ K</span></label>;
}

function TicketTable({ data, onOpen, onUrlStateChange, state }: {
  data: SupportData;
  onOpen: (ticket: Ticket) => void;
  onUrlStateChange: (update: (state: TicketUrlState) => TicketUrlState) => void;
  state: TicketUrlState;
}) {
  const columns = useMemo<ColumnDef<Ticket>[]>(() => [
    {
      accessorKey: "id",
      header: "Ticket",
      cell: ({ row }) => <button className="sf-ticket-link" onClick={() => onOpen(row.original)} type="button"><strong>{row.original.subject}</strong><span>{row.original.id} <i>·</i> {getCustomer(data, row.original.customerId)?.name ?? "Unknown customer"}</span></button>,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      filterFn: (row, _columnId, value) => !value || row.original.status === value,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
      filterFn: (row, _columnId, value) => !value || row.original.priority === value,
    },
    {
      accessorKey: "assigneeId",
      header: "Assignee",
      cell: ({ row }) => {
        const member = getMember(data, row.original.assigneeId);
        return <span className="sf-assignee"><Avatar member={member} /><span>{member?.name ?? "Unassigned"}</span></span>;
      },
      filterFn: (row, _columnId, value) => !value || row.original.assigneeId === value,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => <span className="sf-date">{formatDate(row.original.createdAt)}</span>,
    },
  ], [data, onOpen]);

  const sorting: SortingState = [{ id: state.sort, desc: state.direction === "desc" }];
  const filters: ColumnFiltersState = [
    ...(state.status ? [{ id: "status", value: state.status }] : []),
    ...(state.priority ? [{ id: "priority", value: state.priority }] : []),
    ...(state.assignee ? [{ id: "assigneeId", value: state.assignee }] : []),
  ];
  const pagination: PaginationState = { pageIndex: state.page, pageSize: state.pageSize };
  const table = useReactTable({
    data: data.tickets,
    columns,
    state: { globalFilter: state.search, columnFilters: filters, sorting, pagination },
    globalFilterFn: (row, _columnId, filter) => {
      const customer = getCustomer(data, row.original.customerId);
      const term = String(filter).toLowerCase();
      return `${row.original.id} ${row.original.subject} ${row.original.description} ${customer?.name ?? ""} ${customer?.company ?? ""}`.toLowerCase().includes(term);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onUrlStateChange((current) => ({ ...current, sort: next[0]?.id ?? "createdAt", direction: next[0]?.desc ? "desc" : "asc" }));
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      onUrlStateChange((current) => ({ ...current, page: next.pageIndex, pageSize: next.pageSize }));
    },
    getRowId: (ticket) => ticket.id,
  });
  const resultCount = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  useEffect(() => {
    if (state.page >= pageCount && state.page !== Math.max(0, pageCount - 1)) {
      onUrlStateChange((current) => ({ ...current, page: Math.max(0, pageCount - 1) }));
    }
  }, [onUrlStateChange, pageCount, state.page]);

  return (
    <div className="sf-table-wrap">
      <div className="sf-table-scroll">
        <table className="sf-table">
          <thead><tr>{table.getHeaderGroups().map((group) => group.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder ? null : <button className="sf-sort-button" type="button" onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header, header.getContext())}<span>{header.column.getIsSorted() === "asc" ? "↑" : header.column.getIsSorted() === "desc" ? "↓" : ""}</span></button>}
            </th>
          )))}</tr></thead>
          <tbody>
            {table.getRowModel().rows.map((row) => <tr key={row.id}>{row.getVisibleCells().map((cell) => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}
            {resultCount === 0 && <tr><td className="sf-table-empty" colSpan={columns.length}><div className="sf-empty-icon"><Icon name="inbox" size={23} /></div><strong>No tickets found</strong><span>Try adjusting your search or filters.</span></td></tr>}
          </tbody>
        </table>
      </div>
      <div className="sf-pagination">
        <span>{resultCount ? `Showing ${table.getState().pagination.pageIndex * state.pageSize + 1}–${Math.min((state.page + 1) * state.pageSize, resultCount)} of ${resultCount}` : "No results"}</span>
        <div className="sf-pagination-actions">
          <label>Rows <select aria-label="Rows per page" value={state.pageSize} onChange={(event) => onUrlStateChange((current) => ({ ...current, pageSize: Number(event.target.value), page: 0 }))}>{[5, 8, 15, 25].map((size) => <option key={size}>{size}</option>)}</select></label>
          <button aria-label="Previous page" className="sf-page-button" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} type="button">‹</button>
          <span className="sf-page-count">{table.getPageCount() ? state.page + 1 : 0} / {table.getPageCount()}</span>
          <button aria-label="Next page" className="sf-page-button" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} type="button">›</button>
        </div>
      </div>
    </div>
  );
}

function TicketDetails({ data, ticket, currentUser, onClose, onEdit, onSave }: {
  data: SupportData;
  ticket: Ticket;
  currentUser: TeamMember;
  onClose: () => void;
  onEdit: () => void;
  onSave: (next: SupportData) => boolean;
}) {
  const dialogRef = useDialogAccessibility<HTMLElement>(onClose);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const customer = getCustomer(data, ticket.customerId);
  const update = (patch: Partial<Pick<Ticket, "status" | "priority" | "assigneeId">>) => {
    const next = updateTicket(data, ticket.id, {
      subject: ticket.subject,
      description: ticket.description,
      customerId: ticket.customerId,
      assigneeId: patch.assigneeId ?? ticket.assigneeId,
      priority: patch.priority ?? ticket.priority,
      status: patch.status ?? ticket.status,
    });
    onSave(next);
  };
  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = commentSchema.safeParse({ body: comment });
    if (!result.success) {
      setCommentError(result.error.issues[0]?.message ?? "Enter a valid comment.");
      return;
    }
    if (onSave(addComment(data, ticket.id, currentUser.id, result.data.body))) {
      setComment("");
      setCommentError("");
    }
  };

  return (
    <div className="sf-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} aria-labelledby="ticket-detail-title" aria-modal="true" className="sf-drawer" role="dialog" tabIndex={-1}>
        <header className="sf-drawer-header"><span className="sf-ticket-id">{ticket.id}</span><div><button className="sf-icon-button" onClick={onEdit} type="button" aria-label="Edit ticket">Edit</button><button className="sf-icon-button" onClick={onClose} type="button" aria-label="Close ticket details">×</button></div></header>
        <div className="sf-drawer-content">
          <div className="sf-detail-badges"><StatusBadge status={ticket.status} /><PriorityBadge priority={ticket.priority} /></div>
          <h2 id="ticket-detail-title">{ticket.subject}</h2>
          <p className="sf-detail-description">{ticket.description}</p>
          <div className="sf-meta-grid">
            <label><span>Customer</span><strong>{customer?.name ?? "Unknown customer"}</strong><small>{customer?.company ?? ""}</small></label>
            <label><span>Assignee</span><select value={ticket.assigneeId} onChange={(event) => update({ assigneeId: event.target.value })}>{data.team.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label>
            <label><span>Status</span><select value={ticket.status} onChange={(event) => update({ status: event.target.value as TicketStatus })}>{["Open", "In progress", "Waiting", "Resolved"].map((status) => <option key={status}>{status}</option>)}</select></label>
            <label><span>Priority</span><select value={ticket.priority} onChange={(event) => update({ priority: event.target.value as TicketPriority })}>{["Urgent", "High", "Normal", "Low"].map((priority) => <option key={priority}>{priority}</option>)}</select></label>
            <label><span>Created</span><strong>{formatTime(ticket.createdAt)}</strong></label>
            <label><span>Last updated</span><strong>{formatTime(ticket.updatedAt)}</strong></label>
          </div>
          <section className="sf-conversation"><div className="sf-section-heading"><h3>Conversation</h3><span>{ticket.comments.length} {ticket.comments.length === 1 ? "reply" : "replies"}</span></div>
            {ticket.comments.length === 0 && <p className="sf-conversation-empty">No replies yet. Add the first note below.</p>}
            {ticket.comments.map((item) => {
              const author = getMember(data, item.authorId);
              return <article className="sf-comment" key={item.id}><Avatar member={author} /><div><header><strong>{author?.name ?? "Support teammate"}</strong><time>{formatTime(item.createdAt)}</time></header><p>{item.body}</p></div></article>;
            })}
            <form className="sf-comment-form" onSubmit={submitComment}><label className="sf-field"><span className="sf-sr-only">Add a comment</span><textarea className="sf-input sf-textarea" rows={3} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a reply…" /></label>{commentError && <p className="sf-field-error" role="alert">{commentError}</p>}<button className="sf-button sf-button-primary" type="submit">Add reply</button></form>
          </section>
        </div>
      </section>
    </div>
  );
}

function TicketDialog({ data, ticket, onClose, onSubmit }: { data: SupportData; ticket?: Ticket; onClose: () => void; onSubmit: (input: TicketInput) => void }) {
  const dialogRef = useDialogAccessibility<HTMLElement>(onClose);
  return <div className="sf-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} aria-labelledby="ticket-form-title" aria-modal="true" className="sf-dialog" role="dialog" tabIndex={-1}><header className="sf-dialog-header"><div><p className="sf-eyebrow">{ticket ? `EDIT ${ticket.id}` : "NEW REQUEST"}</p><h2 id="ticket-form-title">{ticket ? "Edit ticket" : "Create a ticket"}</h2><p className="sf-muted">Keep the details clear so the right person can help.</p></div><button aria-label="Close form" className="sf-icon-button" onClick={onClose} type="button">×</button></header><TicketForm customers={data.customers} team={data.team} ticket={ticket} onCancel={onClose} onSubmit={onSubmit} /></section></div>;
}

function Overview({ data, metrics, onNavigate, onOpen, onCreate }: {
  data: SupportData;
  metrics: ReturnType<typeof calculateAnalytics>;
  onNavigate: (view: View) => void;
  onOpen: (ticket: Ticket) => void;
  onCreate: () => void;
}) {
  const latest = [...data.tickets].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const stats = [
    { label: "Open tickets", value: metrics.openCount, note: "Need a response", icon: "inbox" as const, tone: "mint" },
    { label: "New this week", value: metrics.newCount, note: "Created in 7 days", icon: "spark" as const, tone: "blue" },
    { label: "Resolved this week", value: metrics.resolvedCount, note: "Closed in 7 days", icon: "check" as const, tone: "peach" },
    { label: "Avg. resolution", value: metrics.averageResolutionHours === null ? "—" : `${metrics.averageResolutionHours.toFixed(1)}h`, note: "Across resolved tickets", icon: "clock" as const, tone: "lilac" },
  ];
  const todayLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date()).toUpperCase();
  return <div className="sf-page-content">
    <PageTitle eyebrow={todayLabel} title="Good morning, Sara" detail="Here’s what’s happening across your support inbox today." action={<button className="sf-button sf-button-primary" onClick={onCreate} type="button"><Icon name="plus" size={17} /> New ticket</button>} />
    <div className="sf-stat-grid">{stats.map((stat) => <article className="sf-stat-card" key={stat.label}><div className={`sf-stat-icon ${stat.tone}`}><Icon name={stat.icon} size={19} /></div><p>{stat.label}</p><strong>{stat.value}</strong><span>{stat.note}</span></article>)}</div>
    <div className="sf-overview-grid">
      <section className="sf-panel sf-recent-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">INBOX</p><h2>Recent tickets</h2></div><button className="sf-text-link" onClick={() => onNavigate("tickets")} type="button">View all <Icon name="arrow" size={15} /></button></div><div className="sf-recent-list">{latest.map((ticket) => { const customer = getCustomer(data, ticket.customerId); return <button className="sf-recent-row" key={ticket.id} onClick={() => onOpen(ticket)} type="button"><span className="sf-recent-mark"><Icon name="inbox" size={17} /></span><span className="sf-recent-copy"><strong>{ticket.subject}</strong><small>{customer?.name ?? "Unknown"} · {ticket.id}</small></span><StatusBadge status={ticket.status} /><span className="sf-row-date">{formatDate(ticket.createdAt)}</span></button>; })}</div></section>
      <section className="sf-panel sf-workload-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">TEAM</p><h2>Open workload</h2></div><button className="sf-icon-button" onClick={() => onNavigate("team")} type="button" aria-label="View team">···</button></div><div className="sf-workload-list">{metrics.workload.slice(0, 4).map(({ member, count }) => <div className="sf-workload-row" key={member.id}><Avatar member={member} /><span className="sf-workload-person"><strong>{member.name}</strong><small>{member.title}</small></span><span className="sf-workload-count">{count}</span></div>)}</div><button className="sf-workload-footer" onClick={() => onNavigate("team")} type="button">See team <Icon name="arrow" size={15} /></button></section>
    </div>
    <div className="sf-overview-grid sf-bottom-grid"><section className="sf-panel sf-chart-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">LAST 7 DAYS</p><h2>Ticket volume</h2></div><span className="sf-chart-legend"><i /> New tickets</span></div><div className="sf-volume-chart" aria-label="New tickets per day in the last seven days">{metrics.volumeByDay.map((day) => <div className="sf-volume-day" key={day.date}><span className="sf-volume-bar" style={{ height: `${Math.max(4, day.count / Math.max(1, ...metrics.volumeByDay.map((item) => item.count)) * 100)}%` }} title={`${day.count} tickets`} /><small>{day.label}</small></div>)}</div></section><section className="sf-panel sf-quick-panel"><p className="sf-eyebrow">QUICK ACTION</p><h2>Make room for good support.</h2><p>Capture a customer request and route it to the teammate who can help.</p><button className="sf-button sf-button-primary" onClick={onCreate} type="button"><Icon name="plus" size={17} /> Create a ticket</button></section></div>
  </div>;
}

function TicketsView({ data, onUrlStateChange, state, onOpen, onCreate }: {
  data: SupportData;
  onUrlStateChange: (update: (state: TicketUrlState) => TicketUrlState) => void;
  state: TicketUrlState;
  onOpen: (ticket: Ticket) => void;
  onCreate: () => void;
}) {
  return <div className="sf-page-content"><PageTitle eyebrow="CUSTOMER SUPPORT" title="Tickets" detail="Track, prioritize, and resolve customer requests." action={<button className="sf-button sf-button-primary" onClick={onCreate} type="button"><Icon name="plus" size={17} /> New ticket</button>} />
    <section className="sf-panel sf-ticket-panel"><div className="sf-ticket-toolbar"><SearchBox value={state.search} onChange={(search) => onUrlStateChange((current) => ({ ...current, search, page: 0 }))} placeholder="Search tickets…" /><label className="sf-filter"><span>Status</span><select value={state.status} onChange={(event) => onUrlStateChange((current) => ({ ...current, status: event.target.value, page: 0 }))}><option value="">All statuses</option>{["Open", "In progress", "Waiting", "Resolved"].map((status) => <option key={status}>{status}</option>)}</select></label><label className="sf-filter"><span>Priority</span><select value={state.priority} onChange={(event) => onUrlStateChange((current) => ({ ...current, priority: event.target.value, page: 0 }))}><option value="">All priorities</option>{["Urgent", "High", "Normal", "Low"].map((priority) => <option key={priority}>{priority}</option>)}</select></label><label className="sf-filter"><span>Assignee</span><select value={state.assignee} onChange={(event) => onUrlStateChange((current) => ({ ...current, assignee: event.target.value, page: 0 }))}><option value="">Everyone</option>{data.team.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}</select></label></div><TicketTable data={data} onOpen={onOpen} onUrlStateChange={onUrlStateChange} state={state} /></section>
  </div>;
}

function CustomersView({ data, onCustomerSelect }: { data: SupportData; onCustomerSelect: (customer: Customer) => void }) {
  const [search, setSearch] = useState("");
  const visible = data.customers.filter((customer) => `${customer.name} ${customer.email} ${customer.company}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="sf-page-content"><PageTitle eyebrow="RELATIONSHIPS" title="Customers" detail={`${data.customers.length} customer records in your demo workspace.`} /><SearchBox value={search} onChange={setSearch} placeholder="Search customers…" /><div className="sf-customer-grid">{visible.map((customer) => <button className="sf-customer-card" key={customer.id} onClick={() => onCustomerSelect(customer)} type="button"><span className="sf-customer-avatar">{initials(customer.name)}</span><span className="sf-customer-info"><strong>{customer.name}</strong><small>{customer.company}</small><small>{customer.email}</small></span><span className={`sf-plan-badge ${customer.plan.toLowerCase()}`}>{customer.plan}</span><span className="sf-customer-tickets">{data.tickets.filter((ticket) => ticket.customerId === customer.id).length} tickets</span></button>)}{visible.length === 0 && <p className="sf-empty-state">No customers match “{search}”. Try another search.</p>}</div></div>;
}

function TeamView({ data }: { data: SupportData }) {
  return <div className="sf-page-content"><PageTitle eyebrow="YOUR PEOPLE" title="Team" detail="A look at the people keeping customers moving." /><div className="sf-demo-notice"><Icon name="spark" size={17} /><span><strong>Demo roles</strong> — role labels are for display only and do not provide authorization.</span></div><div className="sf-team-grid">{data.team.map((member) => <article className="sf-team-card" key={member.id}><div className="sf-team-card-top"><Avatar member={member} size="large" /><span className={`sf-role-badge ${member.role.toLowerCase()}`}>{member.role}</span></div><h2>{member.name}</h2><p>{member.title}</p><a href={`mailto:${member.email}`}>{member.email}</a><div className="sf-team-load"><span>Open tickets</span><strong>{data.tickets.filter((ticket) => ticket.assigneeId === member.id && ticket.status !== "Resolved").length}</strong></div></article>)}</div></div>;
}

function AnalyticsView({ metrics }: { metrics: ReturnType<typeof calculateAnalytics> }) {
  const maxVolume = Math.max(1, ...metrics.volumeByDay.map((day) => day.count));
  const total = metrics.byPriority.reduce((sum, item) => sum + item.count, 0);
  return <div className="sf-page-content"><PageTitle eyebrow="THE BIG PICTURE" title="Analytics" detail="A live snapshot calculated from this demo ticket dataset." /><div className="sf-metric-explainer"><Icon name="spark" size={17} /><span><strong>Metric definitions</strong> — Open excludes resolved; new and resolved use the last 7 days; average resolution uses all valid resolved tickets.</span></div><div className="sf-analytics-grid"><section className="sf-panel sf-chart-panel sf-analytics-volume"><div className="sf-panel-heading"><div><p className="sf-eyebrow">LAST 7 DAYS</p><h2>Ticket volume</h2></div><span className="sf-chart-legend"><i /> New tickets</span></div><div className="sf-volume-chart sf-volume-chart-tall" aria-label="New tickets per day in the last seven days">{metrics.volumeByDay.map((day) => <div className="sf-volume-day" key={day.date}><span className="sf-volume-bar" style={{ height: `${Math.max(4, day.count / maxVolume * 100)}%` }} title={`${day.count} tickets`} /><small>{day.label}</small></div>)}</div></section><section className="sf-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">CURRENT QUEUE</p><h2>By status</h2></div></div><div className="sf-breakdown-list">{metrics.byStatus.map((item) => <div className="sf-breakdown-row" key={item.status}><span className={`sf-breakdown-dot ${statusClass[item.status]}`} /><span>{item.status}</span><strong>{item.count}</strong></div>)}</div></section><section className="sf-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">CURRENT QUEUE</p><h2>By priority</h2></div></div><div className="sf-priority-bars">{metrics.byPriority.map((item) => <div className="sf-priority-bar-row" key={item.priority}><div><span>{item.priority}</span><strong>{item.count}</strong></div><div className="sf-meter"><i className={priorityClass[item.priority]} style={{ width: `${total ? item.count / total * 100 : 0}%` }} /></div></div>)}</div></section><section className="sf-panel"><div className="sf-panel-heading"><div><p className="sf-eyebrow">TEAM</p><h2>Open workload</h2></div></div><div className="sf-workload-list">{metrics.workload.map(({ member, count }) => <div className="sf-workload-row" key={member.id}><Avatar member={member} /><span className="sf-workload-person"><strong>{member.name}</strong><small>{member.title}</small></span><span className="sf-workload-count">{count}</span></div>)}</div></section></div></div>;
}

function CustomerDetails({ customer, data, onClose }: { customer: Customer; data: SupportData; onClose: () => void }) {
  const dialogRef = useDialogAccessibility<HTMLElement>(onClose);
  const tickets = data.tickets.filter((ticket) => ticket.customerId === customer.id);
  return <div className="sf-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} aria-labelledby="customer-detail-title" aria-modal="true" className="sf-dialog sf-customer-dialog" role="dialog" tabIndex={-1}><header className="sf-dialog-header"><div><span className="sf-customer-avatar">{initials(customer.name)}</span><h2 id="customer-detail-title">{customer.name}</h2><p className="sf-muted">{customer.company} · {customer.plan}</p></div><button aria-label="Close customer details" className="sf-icon-button" onClick={onClose} type="button">×</button></header><div className="sf-customer-details"><p><span>Email</span><strong>{customer.email}</strong></p><p><span>Location</span><strong>{customer.location}</strong></p><p><span>Customer since</span><strong>{formatDate(customer.joinedAt)}</strong></p><h3>Recent tickets <span>{tickets.length}</span></h3>{tickets.length ? tickets.slice(0, 4).map((ticket) => <div className="sf-customer-ticket" key={ticket.id}><span>{ticket.subject}</span><StatusBadge status={ticket.status} /></div>) : <p className="sf-muted">No tickets yet.</p>}</div></section></div>;
}

export default function SupportFlowApp() {
  const repositorySnapshot = useSyncExternalStore(
    supportRepository.subscribe,
    supportRepository.getSnapshot,
    supportRepository.getServerSnapshot,
  );
  const locationSearch = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const data = repositorySnapshot.data;
  const urlParams = useMemo(() => new URLSearchParams(locationSearch), [locationSearch]);
  const requestedView = urlParams.get("view");
  const view = navigation.find((item) => item.id === requestedView)?.id ?? "overview";
  const ticketUrlState = useMemo(() => parseTicketUrlState(locationSearch), [locationSearch]);
  const [mutationError, setMutationError] = useState("");
  const storageError = repositorySnapshot.error || mutationError;
  const [notice, setNotice] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [editingTicket, setEditingTicket] = useState<Ticket | null | undefined>(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const updateUrlState = useCallback((update: (state: TicketUrlState) => TicketUrlState) => {
    writeLocation(view, update(parseTicketUrlState(window.location.search)), false);
  }, [view]);

  const metrics = useMemo(() => calculateAnalytics(data), [data]);
  const selectedTicket = data.tickets.find((ticket) => ticket.id === selectedTicketId);
  const currentUser = data.team[0];
  const persist = (next: SupportData, successMessage?: string) => {
    try {
      supportRepository.save(next);
      setMutationError("");
      if (successMessage) setNotice(successMessage);
      return true;
    } catch (error) {
      setMutationError(error instanceof Error ? error.message : "This change could not be saved.");
      return false;
    }
  };

  const submitTicket = (input: TicketInput) => {
    try {
      let saved = false;
      if (editingTicket) {
        saved = persist(updateTicket(data, editingTicket.id, input), `${editingTicket.id} was updated.`);
      } else {
        const ticket = createTicket(data, input);
        saved = persist({ ...data, tickets: [ticket, ...data.tickets] }, `${ticket.id} was created.`);
        if (saved) setSelectedTicketId(ticket.id);
      }
      if (saved) setEditingTicket(undefined);
    } catch (error) {
      setMutationError(error instanceof Error ? error.message : "The ticket could not be saved.");
    }
  };

  const saveTicketDetails = (next: SupportData) => persist(next, "Ticket updated.");
  const restoreSampleData = () => {
    try {
      supportRepository.reset();
      setMutationError("");
      setNotice("Sample data restored.");
    } catch (error) {
      setMutationError(error instanceof Error ? error.message : "The sample data could not be restored.");
    }
  };
  const navigate = useCallback((next: View) => {
    const nextState = next === "tickets"
      ? parseTicketUrlState(window.location.search)
      : { ...parseTicketUrlState(window.location.search), search: "", status: "", priority: "", assignee: "", page: 0 };
    writeLocation(next, nextState, true);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        navigate("tickets");
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);

  const activeNavigation = navigation.find((item) => item.id === view);

  return <main className="sf-shell">
    <aside className="sf-sidebar">
      <Link className="sf-brand" href="/" aria-label="SupportFlow home"><span className="sf-brand-mark"><i /><i /><i /></span><span>supportflow<span>.</span></span></Link>
      <div className="sf-workspace"><span className="sf-workspace-mark">S</span><span><strong>Acme Support</strong><small>Demo workspace</small></span><span className="sf-workspace-chevron">⌄</span></div>
      <p className="sf-nav-label">WORKSPACE</p>
      <nav className="sf-navigation" aria-label="Main navigation">{navigation.map((item) => <button className={`sf-nav-item ${view === item.id ? "active" : ""}`} key={item.id} onClick={() => navigate(item.id)} type="button"><Icon name={item.icon} size={18} /><span>{item.label}</span>{item.id === "tickets" && <span className="sf-nav-count">{metrics.openCount}</span>}</button>)}</nav>
      <div className="sf-sidebar-bottom"><div className="sf-help-card"><span className="sf-help-star">✳</span><strong>Need a hand?</strong><p>Find tips and shortcuts in our help center.</p><button onClick={() => setNotice("The help center is part of this demo workspace.")} type="button">Visit help center <Icon name="arrow" size={14} /></button></div><div className="sf-profile"><Avatar member={currentUser} /><span><strong>{currentUser.name}</strong><small>Admin · demo only</small></span><button aria-label="Demo profile options" onClick={() => setNotice("Role labels are demo-only and do not secure access.")} type="button">···</button></div></div>
    </aside>
    <section className="sf-main">
      <header className="sf-topbar"><div className="sf-mobile-brand"><Link className="sf-brand" href="/"><span className="sf-brand-mark"><i /><i /><i /></span><span>supportflow<span>.</span></span></Link></div><div className="sf-breadcrumb"><span>Workspace</span><span>/</span><strong>{activeNavigation?.label ?? "Overview"}</strong></div><div className="sf-top-actions"><button className="sf-top-search" onClick={() => navigate("tickets")} type="button"><Icon name="search" size={16} /><span>Search tickets</span><kbd>⌘ K</kbd></button><button aria-label="Notifications" className="sf-notification" onClick={() => setNotice("You’re all caught up.")} type="button"><span className="sf-notification-dot" /><Icon name="bell" size={18} /></button><Avatar member={currentUser} /></div></header>
      {storageError && <div className="sf-storage-alert" role="alert"><strong>Local demo storage unavailable.</strong><span>{storageError}</span><button className="sf-reset-button" onClick={restoreSampleData} type="button">Restore sample data</button></div>}
      {view === "overview" && <Overview data={data} metrics={metrics} onNavigate={navigate} onOpen={(ticket) => setSelectedTicketId(ticket.id)} onCreate={() => setEditingTicket(null)} />}
      {view === "tickets" && <TicketsView data={data} onUrlStateChange={updateUrlState} state={ticketUrlState} onOpen={(ticket) => setSelectedTicketId(ticket.id)} onCreate={() => setEditingTicket(null)} />}
      {view === "customers" && <CustomersView data={data} onCustomerSelect={setSelectedCustomer} />}
      {view === "team" && <TeamView data={data} />}
      {view === "analytics" && <AnalyticsView metrics={metrics} />}
      <footer className="sf-footer"><span>SupportFlow <i>·</i> Demo workspace</span><span>Sample data is local to this browser and isn’t shared with a team.</span></footer>
    </section>
    {selectedTicket && <TicketDetails data={data} ticket={selectedTicket} currentUser={currentUser} onClose={() => setSelectedTicketId(null)} onEdit={() => { setEditingTicket(selectedTicket); setSelectedTicketId(null); }} onSave={saveTicketDetails} />}
    {editingTicket !== undefined && <TicketDialog data={data} ticket={editingTicket ?? undefined} onClose={() => setEditingTicket(undefined)} onSubmit={submitTicket} />}
    {selectedCustomer && <CustomerDetails customer={selectedCustomer} data={data} onClose={() => setSelectedCustomer(null)} />}
    {notice && <div className="sf-toast" role="status"><span>✓</span>{notice}</div>}
  </main>;
}
