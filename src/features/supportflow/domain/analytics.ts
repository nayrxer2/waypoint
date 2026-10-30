import type { AnalyticsMetrics, SupportData, TicketPriority, TicketStatus } from "./types";

const statuses: TicketStatus[] = ["Open", "In progress", "Waiting", "Resolved"];
const priorities: TicketPriority[] = ["Urgent", "High", "Normal", "Low"];
const dayMilliseconds = 24 * 60 * 60 * 1000;

export function calculateAnalytics(data: SupportData, now = new Date()): AnalyticsMetrics {
  const periodStart = new Date(now.getTime() - 7 * dayMilliseconds);
  const resolvedInPeriod = data.tickets.filter(
    (ticket) => ticket.resolvedAt && new Date(ticket.resolvedAt) >= periodStart && new Date(ticket.resolvedAt) <= now,
  );
  const createdInPeriod = data.tickets.filter(
    (ticket) => new Date(ticket.createdAt) >= periodStart && new Date(ticket.createdAt) <= now,
  );
  const durations = data.tickets.flatMap((ticket) => {
    if (!ticket.resolvedAt) return [];
    const created = new Date(ticket.createdAt).getTime();
    const resolved = new Date(ticket.resolvedAt).getTime();
    return Number.isFinite(created) && Number.isFinite(resolved) && resolved >= created
      ? [(resolved - created) / (60 * 60 * 1000)]
      : [];
  });
  const volumeByDay = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const nextDay = new Date(date.getTime() + dayMilliseconds);
    return {
      date: date.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("en", { weekday: "short" }).format(date),
      count: createdInPeriod.filter((ticket) => {
        const created = new Date(ticket.createdAt);
        return created >= date && created < nextDay;
      }).length,
    };
  });

  return {
    openCount: data.tickets.filter((ticket) => ticket.status !== "Resolved").length,
    newCount: createdInPeriod.length,
    resolvedCount: resolvedInPeriod.length,
    averageResolutionHours: durations.length
      ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length
      : null,
    volumeByDay,
    byStatus: statuses.map((status) => ({
      status,
      count: data.tickets.filter((ticket) => ticket.status === status).length,
    })),
    byPriority: priorities.map((priority) => ({
      priority,
      count: data.tickets.filter((ticket) => ticket.priority === priority).length,
    })),
    workload: data.team.map((member) => ({
      member,
      count: data.tickets.filter((ticket) => ticket.assigneeId === member.id && ticket.status !== "Resolved").length,
    })).sort((a, b) => b.count - a.count),
  };
}
