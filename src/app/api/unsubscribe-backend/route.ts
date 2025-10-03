import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase admin client (uses service role key, bypasses RLS)
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

    // Normalize the email for consistent matching
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Unsubscribe request received for:", normalizedEmail);

    const { data: check, error: checkError } = await supabaseAdmin
      .from("waitlist_lookbook")
      .select("email")
      .eq("email", normalizedEmail);

    console.log("Lookup result before delete:", check, "Error:", checkError);

    // Delete matching row(s)
    const { data, error } = await supabaseAdmin
      .from("waitlist_lookbook")
      .delete()
      .eq("email", normalizedEmail)
      .select("*"); // return deleted rows

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
    }

    if (data && data.length > 0) {
      console.log("Deleted rows:", data);
      return NextResponse.json({ success: true, removed: data });
    }

    console.warn("No matching rows found for email:", normalizedEmail);
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  } catch (err) {
    console.error("Server error in unsubscribe:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


