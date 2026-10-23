export type MockUser = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  avatarInitials: string;
  title: string;
  timezone: string;
  bio: string;
  workspace: {
    name: string;
    initials: string;
    plan: string;
    role: string;
  };
};

export const mockUser: MockUser = {
  id: "demo-user",
  name: "Sara Connor",
  firstName: "Sara",
  email: "sara@waypoint.demo",
  avatarInitials: "SC",
  title: "Product designer",
  timezone: "America/Los_Angeles",
  bio: "Building thoughtful products with the Northstar Studio team.",
  workspace: {
    name: "Northstar Studio",
    initials: "N",
    plan: "Free workspace",
    role: "Workspace owner",
  },
};
