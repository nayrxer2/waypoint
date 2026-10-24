"use client";

import { useEffect, useState } from "react";
import getGreeting from "./getGreeting";

export default function WelcomeGreeting() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting());

    updateGreeting();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateGreeting();
      }
    };

    window.addEventListener("pageshow", updateGreeting);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", updateGreeting);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <p>{greeting}!</p>;
}