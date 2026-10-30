import { z } from "zod";

export const ticketSchema = z.object({
  subject: z.string().trim().min(5, "Add a subject with at least 5 characters.").max(120, "Keep the subject under 120 characters."),
  description: z.string().trim().min(10, "Add a little more detail (at least 10 characters).").max(2000, "Keep the description under 2,000 characters."),
  customerId: z.string().min(1, "Choose a customer."),
  assigneeId: z.string().min(1, "Choose a teammate."),
  priority: z.enum(["Urgent", "High", "Normal", "Low"]),
  status: z.enum(["Open", "In progress", "Waiting", "Resolved"]),
});

export const commentSchema = z.object({
  body: z.string().trim().min(2, "Write a comment before sending.").max(1000, "Keep comments under 1,000 characters."),
});

const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company: z.string(),
  plan: z.enum(["Enterprise", "Growth", "Starter"]),
  location: z.string(),
  joinedAt: z.string().datetime(),
});

const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  initials: z.string(),
  color: z.string(),
  role: z.enum(["Admin", "Lead", "Support"]),
  title: z.string(),
});

const ticketCommentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
});

const ticketRecordSchema = z.object({
  id: z.string(),
  subject: z.string(),
  description: z.string(),
  status: z.enum(["Open", "In progress", "Waiting", "Resolved"]),
  priority: z.enum(["Urgent", "High", "Normal", "Low"]),
  customerId: z.string(),
  assigneeId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().nullable(),
  comments: z.array(ticketCommentSchema),
});

export const supportDataSchema = z.object({
  tickets: z.array(ticketRecordSchema),
  customers: z.array(customerSchema),
  team: z.array(teamMemberSchema),
});

export type TicketInput = z.infer<typeof ticketSchema>;
