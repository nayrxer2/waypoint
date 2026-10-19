"use client";

import { useState } from "react";
import CredentialsForm, {
  type AuthMode,
} from "./credentials-form";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isSignup = mode === "signup";

  return (
    <main
      className={`relative flex min-h-screen w-full items-center justify-center p-4 transition-colors duration-300 sm:p-6 ${
        isDarkMode ? "dark bg-stone-950" : "bg-[#e6e5df]"
      }`}
    >
      <button
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white/80 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 sm:right-6 sm:top-6"
        type="button"
        aria-pressed={isDarkMode}
        onClick={() => setIsDarkMode((dark) => !dark)}
      >
        <span aria-hidden="true">{isDarkMode ? "☀" : "☾"}</span>
        {isDarkMode ? "Light mode" : "Dark mode"}
      </button>

      <section
        className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900 sm:p-9"
        aria-labelledby="auth-heading"
      >
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
            Waypoint
          </p>
          <h1
            className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100"
            id="auth-heading"
          >
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {isSignup
              ? "Sign up to get started with Waypoint."
              : "Sign in to continue to your account."}
          </p>
        </div>

        <div
          className="mb-7 grid grid-cols-2 rounded-lg bg-stone-100 p-1 dark:bg-stone-800"
          role="group"
          aria-label="Choose sign-in or sign-up"
        >
          <button
            className={`rounded-md px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
              !isSignup
                ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
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
                ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-stone-100"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            }`}
            type="button"
            aria-pressed={isSignup}
            onClick={() => setMode("signup")}
          >
            Create account
          </button>
        </div>

        <CredentialsForm key={mode} mode={mode} />

        <p className="mt-6 text-center text-xs leading-5 text-stone-500 dark:text-stone-400">
          Authentication is not configured yet. Your details will not be saved.
        </p>
      </section>
    </main>
  );
}
