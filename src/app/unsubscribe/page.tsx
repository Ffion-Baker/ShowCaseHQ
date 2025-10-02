"use client";

import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
      setStatus("❌ Invalid unsubscribe link (no email found).");
      return;
    }

    // Call your unsubscribe backend
    fetch("/api/unsubscribe-backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          setStatus(`✅ You’ve been unsubscribed: ${email}`);
        } else {
          setStatus(`❌ Failed to unsubscribe: ${data.error || "Unknown error"}`);
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        setStatus("⚠️ Network error. Please try again later.");
      });
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
