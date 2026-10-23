import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getMockUserForSession,
  mockSessionCookieName,
} from "../lib/mock-auth";
import Welcome from "./welcome/page";

export default async function Home() {
  const cookieStore = await cookies();
  const user = getMockUserForSession(
    cookieStore.get(mockSessionCookieName)?.value,
  );

  if (user) {
    redirect("/dashboard");
  }

  return <Welcome />;
}
