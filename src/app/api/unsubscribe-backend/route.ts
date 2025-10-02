import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const lowerEmail = email.trim().toLowerCase();

    // First, find the row case-insensitive
    const { data: found, error: findErr } = await supabaseAdmin
      .from("waitlist_lookbook")
      .select("id, email")
      .ilike("email", lowerEmail); // case-insensitive match

    if (findErr) {
      console.error("❌ Supabase find error:", findErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!found || found.length === 0) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const ids = found.map((row) => row.id);

    // Delete all matching rows
    const { error: delErr } = await supabaseAdmin
      .from("waitlist_lookbook")
      .delete()
      .in("id", ids);

    if (delErr) {
      console.error("❌ Supabase delete error:", delErr);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    console.log(`✅ Unsubscribed: ${email}`);
    return NextResponse.json({ success: true, removed: ids });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
