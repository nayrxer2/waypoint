export type TicketStatus = "Open" | "In progress" | "Waiting" | "Resolved";
export type TicketPriority = "Urgent" | "High" | "Normal" | "Low";
export type TeamRole = "Admin" | "Lead" | "Support";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Enterprise" | "Growth" | "Starter";
  location: string;
  joinedAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  role: TeamRole;
  title: string;
};

export type TicketComment = {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customerId: string;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  comments: TicketComment[];
};

export type SupportData = {
  tickets: Ticket[];
  customers: Customer[];
  team: TeamMember[];
};

export type AnalyticsMetrics = {
  openCount: number;
  newCount: number;
  resolvedCount: number;
  averageResolutionHours: number | null;
  volumeByDay: { date: string; label: string; count: number }[];
  byStatus: { status: TicketStatus; count: number }[];
  byPriority: { priority: TicketPriority; count: number }[];
  workload: { member: TeamMember; count: number }[];
};
