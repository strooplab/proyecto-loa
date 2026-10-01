"use client";

import { useState } from "react";

function useRateLimited(type: "contact" | "direct" | "checkout") {
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);

  const attempt = async (): Promise<boolean> => {
    const res = await fetch("/api/ratelimit", {
      method: "POST",
      body: JSON.stringify({ type }),
    });
    const data = await res.json();
    if (!data.success) {
      setBlockedUntil(data.reset);
      return false;
    }
    return true;
  };

  return { attempt, blockedUntil };
}
