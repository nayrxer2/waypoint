import type { SupportData, Ticket, TicketComment } from "./types";
import type { TicketInput } from "./schemas";

export function createTicket(data: SupportData, input: TicketInput, now = new Date()): Ticket {
  const maxId = data.tickets.reduce((max, ticket) => {
    const number = Number(ticket.id.replace("SF-", ""));
    return Number.isInteger(number) ? Math.max(max, number) : max;
  }, 1000);
  const timestamp = now.toISOString();
  return {
    id: `SF-${maxId + 1}`,
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
    resolvedAt: input.status === "Resolved" ? timestamp : null,
    comments: [],
  };
}

export function updateTicket(data: SupportData, ticketId: string, changes: TicketInput, now = new Date()): SupportData {
  const existing = data.tickets.find((ticket) => ticket.id === ticketId);
  if (!existing) throw new Error("This ticket no longer exists.");
  const timestamp = now.toISOString();
  return {
    ...data,
    tickets: data.tickets.map((ticket) => ticket.id !== ticketId ? ticket : {
      ...ticket,
      ...changes,
      updatedAt: timestamp,
      resolvedAt: changes.status === "Resolved"
        ? existing.status === "Resolved" ? existing.resolvedAt : timestamp
        : null,
    }),
  };
}

export function addComment(data: SupportData, ticketId: string, authorId: string, body: string, now = new Date()): SupportData {
  const existing = data.tickets.find((ticket) => ticket.id === ticketId);
  if (!existing) throw new Error("This ticket no longer exists.");
  const comment: TicketComment = {
    id: `comment-${now.getTime()}-${existing.comments.length}`,
    authorId,
    body,
    createdAt: now.toISOString(),
  };
  return {
    ...data,
    tickets: data.tickets.map((ticket) => ticket.id === ticketId
      ? { ...ticket, updatedAt: comment.createdAt, comments: [...ticket.comments, comment] }
      : ticket),
  };
}
