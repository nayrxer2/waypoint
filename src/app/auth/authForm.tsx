"use client";

import { useState } from "react";
import CredentialsForm, {
  type AuthMode,
} from "../../components/forms/auth-form";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const isSignup = mode === "signup";

  return (
    <section
      className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 sm:p-9"
      aria-labelledby="auth-heading"
    >
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
          Waypoint
        </p>
        <h1
          className="text-3xl font-semibold tracking-tight text-stone-900"
          id="auth-heading"
        >
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {isSignup
            ? "Sign up to get started with Waypoint."
            : "Sign in to continue to your account."}
        </p>
      </div>

      <div
        className="mb-7 grid grid-cols-2 rounded-lg bg-stone-100 p-1"
        role="group"
        aria-label="Choose sign-in or sign-up"
      >
        <button
          className={`rounded-md px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
            !isSignup
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
          type="button"
          aria-pressed={!isSignup}
          onClick={() => setMode("login")}
        >
          Sign in
        </button>
        <button
          className={`rounded-md px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
            isSignup
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
          type="button"
          aria-pressed={isSignup}
          onClick={() => setMode("signup")}
        >
          Create account
        </button>
      </div>

      <CredentialsForm key={mode} mode={mode} />

      <p className="mt-6 text-center text-xs leading-5 text-stone-500">
        Authentication is not configured yet. Your details will not be saved.
      </p>
    </section>
  );
}
