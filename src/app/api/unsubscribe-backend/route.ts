import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Try to delete the email
    const { data, error } = await supabaseAdmin
      .from("waitlist_lookbook") // make sure this is your table name
      .delete()
      .eq("email", email)
      .select(); // return deleted rows so we can see what happened

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️ No matching rows found for email: ${email}`);
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    console.log(`✅ Unsubscribed: ${email}`);
    return NextResponse.json({ success: true, removed: data });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}