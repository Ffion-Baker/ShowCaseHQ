"use client";

import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
      setStatus("Invalid unsubscribe link.");
      return;
    }

    // Call API to unsubscribe
    fetch(`/api/unsubscribe-backend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("✅ You’ve been unsubscribed from ShowcaseHQ emails.");
        } else {
          setStatus("⚠️ Something went wrong. Please try again later.");
        }
      })
      .catch(() => setStatus("⚠️ Network error. Please try again."));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-xl font-bold mb-4">Unsubscribe</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}
