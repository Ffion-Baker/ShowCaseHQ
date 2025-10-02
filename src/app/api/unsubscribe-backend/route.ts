import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service_role key
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      console.error("❌ No email provided in unsubscribe request");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    console.log("➡️ Unsubscribe request for:", trimmedEmail);

    // Try deleting from your table
    const { data, error } = await supabaseAdmin
      .from("waitlist_lookbook") // make sure this matches your table exactly
      .delete()
      .eq("email", trimmedEmail)
      .select();

    if (error) {
      console.error("❌ Supabase delete error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to unsubscribe" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ Email not found in table:", trimmedEmail);
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    console.log("✅ Successfully unsubscribed:", data);
    return NextResponse.json({ success: true, removed: data });
  } catch (err) {
    console.error("❌ Server error in unsubscribe:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}