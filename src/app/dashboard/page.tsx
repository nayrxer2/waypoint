import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "../../components/dashboard/dashboard";
import {
  getMockUserForSession,
  mockSessionCookieName,
} from "../../lib/mock-auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = getMockUserForSession(
    cookieStore.get(mockSessionCookieName)?.value,
  );

  if (!user) {
    redirect("/welcome");
  }

  return <Dashboard user={user} />;
}