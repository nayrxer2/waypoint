import { describe, expect, it } from "vitest";
import { calculateAnalytics } from "../../src/features/supportflow/domain/analytics";
import { seedData } from "../../src/features/supportflow/domain/seed";
import { ticketSchema } from "../../src/features/supportflow/domain/schemas";
import { createTicket, updateTicket } from "../../src/features/supportflow/domain/ticket-workflows";
import { parseTicketUrlState, serializeTicketUrlState } from "../../src/features/supportflow/domain/url-state";

describe("ticket validation and workflow", () => {
  it("requires a useful subject, description, customer, and teammate", () => {
    const invalid = ticketSchema.safeParse({
      subject: "Help",
      description: "",
      customerId: "",
      assigneeId: "",
      priority: "Normal",
      status: "Open",
    });

    expect(invalid.success).toBe(false);
    if (!invalid.success) {
      expect(invalid.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining(["subject", "description", "customerId", "assigneeId"]),
      );
    }
  });

  it("sets and clears the resolution timestamp as a ticket is resolved and reopened", () => {
    const createdAt = new Date("2026-10-30T09:00:00.000Z");
    const ticket = createTicket(seedData, {
      subject: "A new support request",
      description: "Please help us configure the workspace.",
      customerId: "c-1",
      assigneeId: "sara",
      priority: "Normal",
      status: "Open",
    }, createdAt);
    const resolved = updateTicket({ ...seedData, tickets: [ticket] }, ticket.id, {
      subject: ticket.subject,
      description: ticket.description,
      customerId: ticket.customerId,
      assigneeId: ticket.assigneeId,
      priority: ticket.priority,
      status: "Resolved",
    }, new Date("2026-10-30T11:00:00.000Z"));

    expect(resolved.tickets[0].resolvedAt).toBe("2026-10-30T11:00:00.000Z");

    const reopened = updateTicket(resolved, ticket.id, {
      subject: ticket.subject,
      description: ticket.description,
      customerId: ticket.customerId,
      assigneeId: ticket.assigneeId,
      priority: ticket.priority,
      status: "In progress",
    }, new Date("2026-10-30T12:00:00.000Z"));

    expect(reopened.tickets[0].resolvedAt).toBeNull();
    expect(reopened.tickets[0].updatedAt).toBe("2026-10-30T12:00:00.000Z");
  });
});

describe("URL-persisted ticket state", () => {
  it("round-trips search, filters, sorting, and pagination", () => {
    const state = {
      search: "invoice",
      status: "Waiting",
      priority: "Urgent",
      assignee: "nina",
      sort: "priority",
      direction: "asc" as const,
      page: 2,
      pageSize: 15,
    };

    expect(parseTicketUrlState(serializeTicketUrlState(state))).toEqual(state);
  });

  it("falls back safely for invalid page and sort parameters", () => {
    expect(parseTicketUrlState("?page=-1&pageSize=900&sort=unknown")).toMatchObject({
      page: 0,
      pageSize: 8,
      sort: "createdAt",
      direction: "desc",
    });
  });
});

describe("analytics", () => {
  it("derives dashboard totals from tickets and handles empty data", () => {
    const metrics = calculateAnalytics(seedData, new Date());
    expect(metrics.openCount).toBe(seedData.tickets.filter((ticket) => ticket.status !== "Resolved").length);
    expect(metrics.byStatus.reduce((sum, item) => sum + item.count, 0)).toBe(seedData.tickets.length);
    expect(metrics.averageResolutionHours).not.toBeNull();
    expect(metrics.volumeByDay).toHaveLength(7);
    expect(metrics.workload).toHaveLength(seedData.team.length);

    const empty = calculateAnalytics({ tickets: [], customers: [], team: [] }, new Date());
    expect(empty.openCount).toBe(0);
    expect(empty.newCount).toBe(0);
    expect(empty.resolvedCount).toBe(0);
    expect(empty.averageResolutionHours).toBeNull();
    expect(empty.volumeByDay.every((day) => day.count === 0)).toBe(true);
  });
});
