"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 You're on the waitlist! Check your inbox.");
        setEmail("");
      } else {
        setMessage(data.error || "❌ Something went wrong.");
      }
    } catch {
      setMessage("❌ Failed to connect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0030] to-[#120040] text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/LOGO.png"
            alt="ShowcaseHQ Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">ShowcaseHQ</span>
        </div>
        <nav className="space-x-6 text-sm">
          <Link href="#how" className="hover:text-pink-400">
            How it works
          </Link>
          <Link href="#waitlist" className="hover:text-pink-400">
            Join Waitlist
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
          Showcase your brand in minutes, not weeks
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Create stunning digital lookbooks you can share instantly with buyers,
          clients, and followers.
        </p>
        <Link
          href="#waitlist"
          className="mt-8 px-8 py-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition"
        >
          ✨ Join the Waitlist
        </Link>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16 text-center text-gray-400">
        <p className="uppercase tracking-widest text-sm">
          Trusted by early fashion founders & agencies
        </p>
        <div className="mt-6 flex justify-center gap-12 opacity-70">
          <span className="text-lg">Brand A</span>
          <span className="text-lg">Brand B</span>
          <span className="text-lg">Brand C</span>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="px-6 py-20 bg-[#0f0035] text-center">
        <h2 className="text-3xl font-bold">How it Works</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
          <div>
            <div className="text-pink-400 text-4xl mb-4">📤</div>
            <h3 className="font-semibold text-xl">Upload</h3>
            <p className="text-gray-400 mt-2">
              Add your brand photos in seconds.
            </p>
          </div>
          <div>
            <div className="text-blue-400 text-4xl mb-4">🎨</div>
            <h3 className="font-semibold text-xl">Choose</h3>
            <p className="text-gray-400 mt-2">
              Pick a beautiful template instantly.
            </p>
          </div>
          <div>
            <div className="text-pink-400 text-4xl mb-4">🔗</div>
            <h3 className="font-semibold text-xl">Share</h3>
            <p className="text-gray-400 mt-2">
              Send your lookbook with a single link.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with Email Form */}
      <section id="waitlist" className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Be the first to showcase your brand
        </h2>
        <p className="mt-4 text-gray-400">
          Join the waitlist today — early access spots are limited.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md text-black w-full bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-md font-semibold disabled:opacity-50 transition w-full sm:w-auto"
          >
            {loading ? "Joining..." : "✨ Join Waitlist"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 text-center text-gray-500 text-sm">
        <Image
          src="/logo.png"
          alt="ShowcaseHQ"
          width={30}
          height={30}
          className="mx-auto mb-3"
        />
        <p>© {new Date().getFullYear()} ShowcaseHQ · All rights reserved</p>
        <p className="mt-2">
          <Link href="/privacy" className="hover:text-pink-400">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </main>
  );
}
