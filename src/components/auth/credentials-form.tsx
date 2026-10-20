"use client";

import { useState, type FormEvent } from "react";

export type AuthMode = "login" | "signup";

type CredentialsFormProps = {
  mode: AuthMode;
};

type Feedback = {
  type: "error" | "success";
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  // JSON is untrusted input, so narrow the parsed response before reading its fields.
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const inputClassName =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 disabled:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:disabled:bg-stone-800";

export default function CredentialsForm({ mode }: CredentialsFormProps) {
  const isSignup = mode === "signup";
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Validate locally first, then let the API validate again before it handles credentials.
    event.preventDefault();
    setFeedback(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (isSignup && password !== confirmPassword) {
      setFeedback({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result: unknown = await response.json();
      const data = isRecord(result) ? result : null;

      if (!response.ok) {
        setFeedback({
          type: "error",
          message:
            typeof data?.message === "string"
              ? data.message
              : "We couldn't process your request. Please try again.",
        });
        return;
      }

      if (data?.success !== true) {
        setFeedback({
          type: "error",
          message: "The server returned an unexpected response. Please try again.",
        });
        return;
      }

      setFeedback({
        type: "success",
        message:
          typeof data.message === "string"
            ? data.message
            : isSignup
              ? "Your account has been created."
              : "You are now signed in.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "We couldn't reach the server. Check your connection and try again.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
          htmlFor="auth-email"
        >
          Email address
        </label>
        <input
          className={inputClassName}
          id="auth-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
          htmlFor="auth-password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className={`${inputClassName} pr-20`}
            id="auth-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={isSignup ? "At least 8 characters" : "Enter your password"}
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={isSignup ? 8 : undefined}
            required
            disabled={isPending}
          />
          <button
            className="absolute inset-y-0 right-3 my-auto h-fit rounded px-1 py-2 text-sm font-medium text-stone-500 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 dark:text-stone-400 dark:hover:text-stone-100"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={isPending}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {isSignup && (
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-stone-700 dark:text-stone-300"
            htmlFor="auth-confirm-password"
          >
            Confirm password
          </label>
          <input
            className={inputClassName}
            id="auth-confirm-password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Enter your password again"
            autoComplete="new-password"
            minLength={8}
            required
            disabled={isPending}
          />
        </div>
      )}

      {feedback && (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            feedback.type === "error"
              ? "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
              : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
          }`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400 dark:focus-visible:outline-amber-400"
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Please wait..."
          : isSignup
            ? "Create account"
            : "Sign in"}
      </button>
    </form>
  );
}
