import { mockUser } from "./mock-user";

export const demoCredentials = {
  email: "sara@waypoint.demo",
  password: "waypoint123",
};

export const mockSessionCookieName = "waypoint-demo-session";

export function isMockAuthEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function getMockUserForSession(sessionId: string | undefined) {
  if (!isMockAuthEnabled() || sessionId !== mockUser.id) {
    return null;
  }

  return mockUser;
}
