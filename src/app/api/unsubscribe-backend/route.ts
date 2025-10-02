// src/app/api/unsubscribe-backend/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase admin client (uses service role key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const rawEmail = email.trim();
    console.log("Unsubscribe request received for:", rawEmail);

    // 🔑 Delete using case-insensitive match (cast supabaseAdmin to any)
    const { data, error } = await (supabaseAdmin as any)
      .from("waitlist_lookbook")
      .delete()
      .ilike("email", rawEmail);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    if (data && data.length > 0) {
      console.log("Deleted rows:", data);
      return NextResponse.json({ success: true, removed: data });
    }

    console.warn("No matching rows found for email:", rawEmail);
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  } catch (err) {
    console.error("Server error in unsubscribe:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

