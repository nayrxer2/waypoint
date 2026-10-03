"use client";

import { SubmitEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    
    if (!email) {
      alert("Please enter your email.");
      return;     
    }

    if (!password) {
      alert("Please enter your password.");
      return;           
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}