"use client";

import CredentialsForm from "../../components/forms/auth-form";

import { useState } from "react";

type AuthMode = "login" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="flex min-h-screen justify-center bg-red-200 flex-col">
      <div className="flex flex-col items-center bg-orange-200 p-8 rounded-lg shadow-md">
        <div className="mb-4 text-2xl font-bold text-gray-600">
          <h1>Hello there!</h1>
        </div>
        <div role="tablist" className="flex">
          <button
            role="tab"
            aria-selected={mode === "login"}  
            className={`px-4 py-2
              ${mode === "login" ? 
                "!bg-blue-500 text-white rounded-lg" : 
                "bg-gray-200 text-gray-700"}`
            }
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            role="tab"
            aria-selected={mode === "signup"}
            className={`px-4 py-2
              ${mode === "signup" ? 
                "!bg-blue-500 text-white rounded-lg" : 
                "bg-gray-200 text-gray-700"}`
            }
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>
        <CredentialsForm mode={mode} />
      </div>
    </div>
  )
}
