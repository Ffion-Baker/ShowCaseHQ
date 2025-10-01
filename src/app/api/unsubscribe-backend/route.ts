// src/app/api/unsubscribe-backend/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key
);

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const raw = rawEmail.trim();
    const lower = raw.toLowerCase();
    console.log("Unsubscribe request received for:", { raw, lower });

    // 1) Try direct delete assuming stored emails are normalized to lowercase
    let { data, error } = await supabaseAdmin
      .from("waitlist_lookbook") // <- ensure this is your actual table name
      .delete()
      .eq("email", lower)
      .select(); // return deleted rows

    if (error) {
      console.error("Supabase delete error (direct):", error);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    if (data && data.length > 0) {
      console.log("Deleted rows (direct):", data);
      return NextResponse.json({ success: true, removed: data });
    }

    // 2) Fallback: find case-insensitive matches (ilike) and delete by id
    const { data: found, error: findErr } = await supabaseAdmin
      .from("waitlist_lookbook")
      .select("*")
      .ilike("email", lower); // case-insensitive match

    if (findErr) {
      console.error("Supabase find error:", findErr);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    if (found && found.length > 0) {
      const ids = found.map((r: any) => r.id);
      const { data: delData, error: delErr } = await supabaseAdmin
        .from("waitlist_lookbook")
        .delete()
        .in("id", ids)
        .select();

      if (delErr) {
        console.error("Supabase delete-by-id error:", delErr);
        return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
      }

      console.log("Deleted rows (fallback):", delData);
      return NextResponse.json({ success: true, removed: delData });
    }

    // 3) Nothing found
    console.warn("No matching rows found for email:", raw);
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  } catch (err) {
    console.error("Server error in unsubscribe:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
