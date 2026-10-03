import Link from "next/link";

export default function Home() {
  return (
   <main>
    <h1>Welcome to My App</h1>
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
   </main>
  );
}
