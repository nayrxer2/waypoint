import type { SupportData } from "./types";

const daysAgo = (days: number, hour = 10) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

export const seedData: SupportData = {
  team: [
    { id: "sara", name: "Sara Connor", email: "sara@supportflow.demo", initials: "SC", color: "#b86f54", role: "Admin", title: "Support lead" },
    { id: "marcus", name: "Marcus Chen", email: "marcus@supportflow.demo", initials: "MC", color: "#527a69", role: "Lead", title: "Senior specialist" },
    { id: "aisha", name: "Aisha Patel", email: "aisha@supportflow.demo", initials: "AP", color: "#8a70a6", role: "Support", title: "Customer advocate" },
    { id: "leo", name: "Leo Martin", email: "leo@supportflow.demo", initials: "LM", color: "#6684a0", role: "Support", title: "Customer advocate" },
    { id: "nina", name: "Nina Brooks", email: "nina@supportflow.demo", initials: "NB", color: "#b68a48", role: "Support", title: "Customer advocate" },
  ],
  customers: [
    { id: "c-1", name: "Olivia Rhye", email: "olivia@acme.co", company: "Acme Studio", plan: "Enterprise", location: "New York, US", joinedAt: daysAgo(240) },
    { id: "c-2", name: "Phoenix Baker", email: "phoenix@layers.io", company: "Layers", plan: "Growth", location: "Austin, US", joinedAt: daysAgo(180) },
    { id: "c-3", name: "Lana Steiner", email: "lana@catalog.app", company: "Catalog", plan: "Growth", location: "London, UK", joinedAt: daysAgo(120) },
    { id: "c-4", name: "Demi Wilkinson", email: "demi@circooles.com", company: "Circooles", plan: "Starter", location: "Toronto, CA", joinedAt: daysAgo(88) },
    { id: "c-5", name: "Candice Wu", email: "candice@quotient.co", company: "Quotient", plan: "Enterprise", location: "San Francisco, US", joinedAt: daysAgo(62) },
    { id: "c-6", name: "Natali Craig", email: "natali@hourglass.io", company: "Hourglass", plan: "Starter", location: "Melbourne, AU", joinedAt: daysAgo(35) },
    { id: "c-7", name: "Drew Cano", email: "drew@command.app", company: "Command", plan: "Growth", location: "Chicago, US", joinedAt: daysAgo(18) },
  ],
  tickets: [
    { id: "SF-1048", subject: "Unable to export monthly report", description: "The CSV export gets stuck at 90% whenever I include archived projects. I need this report for our finance review tomorrow.", status: "Open", priority: "Urgent", customerId: "c-1", assigneeId: "marcus", createdAt: daysAgo(0, 8), updatedAt: daysAgo(0, 9), resolvedAt: null, comments: [{ id: "cm-1", authorId: "marcus", body: "I’m checking the export logs and will have an update shortly.", createdAt: daysAgo(0, 9) }] },
    { id: "SF-1047", subject: "Invite link expired too soon", description: "Our new teammate could not accept the invitation because the link expired after just a few hours.", status: "In progress", priority: "High", customerId: "c-2", assigneeId: "aisha", createdAt: daysAgo(0, 7), updatedAt: daysAgo(0, 11), resolvedAt: null, comments: [] },
    { id: "SF-1046", subject: "Update billing contact", description: "Please change the billing contact on our workspace to our finance team.", status: "Waiting", priority: "Normal", customerId: "c-5", assigneeId: "nina", createdAt: daysAgo(1), updatedAt: daysAgo(0, 10), resolvedAt: null, comments: [{ id: "cm-2", authorId: "nina", body: "Could you share the new billing email address?", createdAt: daysAgo(0, 10) }] },
    { id: "SF-1045", subject: "Dashboard shows incorrect timezone", description: "Activity timestamps are one hour ahead of our local timezone after the latest update.", status: "In progress", priority: "High", customerId: "c-3", assigneeId: "leo", createdAt: daysAgo(1, 13), updatedAt: daysAgo(0, 8), resolvedAt: null, comments: [] },
    { id: "SF-1044", subject: "Can I add a second workspace?", description: "We are onboarding a separate business unit and would like to keep its projects separate.", status: "Open", priority: "Normal", customerId: "c-4", assigneeId: "sara", createdAt: daysAgo(2), updatedAt: daysAgo(2), resolvedAt: null, comments: [] },
    { id: "SF-1043", subject: "Two-factor recovery codes", description: "A team member lost their recovery codes. What is the safest way to restore access?", status: "Resolved", priority: "High", customerId: "c-1", assigneeId: "marcus", createdAt: daysAgo(2, 9), updatedAt: daysAgo(1, 15), resolvedAt: daysAgo(1, 15), comments: [{ id: "cm-3", authorId: "marcus", body: "We reset the recovery codes. The member can generate a fresh set from security settings.", createdAt: daysAgo(1, 15) }] },
    { id: "SF-1042", subject: "Invoice payment not reflected", description: "Our invoice was paid yesterday, but the workspace still shows a past-due notice.", status: "Waiting", priority: "Urgent", customerId: "c-5", assigneeId: "nina", createdAt: daysAgo(3), updatedAt: daysAgo(2), resolvedAt: null, comments: [] },
    { id: "SF-1041", subject: "Bulk update project labels", description: "Is there a way to update labels across several projects at once?", status: "Resolved", priority: "Low", customerId: "c-6", assigneeId: "aisha", createdAt: daysAgo(4), updatedAt: daysAgo(3, 14), resolvedAt: daysAgo(3, 14), comments: [] },
    { id: "SF-1040", subject: "Mobile app keeps signing me out", description: "I have to sign in again every time I reopen the mobile app.", status: "Open", priority: "High", customerId: "c-7", assigneeId: "leo", createdAt: daysAgo(5), updatedAt: daysAgo(5), resolvedAt: null, comments: [] },
    { id: "SF-1039", subject: "Share a read-only project view", description: "Can I share a project with an external stakeholder without giving edit access?", status: "Resolved", priority: "Normal", customerId: "c-2", assigneeId: "sara", createdAt: daysAgo(7), updatedAt: daysAgo(6, 12), resolvedAt: daysAgo(6, 12), comments: [] },
    { id: "SF-1038", subject: "Notification preferences", description: "I would like to receive project updates as a daily digest instead of individual emails.", status: "Resolved", priority: "Low", customerId: "c-3", assigneeId: "nina", createdAt: daysAgo(8), updatedAt: daysAgo(7, 16), resolvedAt: daysAgo(7, 16), comments: [] },
    { id: "SF-1037", subject: "Add custom fields to a project", description: "We need a custom field for the region associated with each project.", status: "Resolved", priority: "Normal", customerId: "c-4", assigneeId: "marcus", createdAt: daysAgo(10), updatedAt: daysAgo(9, 11), resolvedAt: daysAgo(9, 11), comments: [] },
  ],
};
