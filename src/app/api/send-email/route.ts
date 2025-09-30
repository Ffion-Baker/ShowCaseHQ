import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import WelcomeEmail from "../../emails/welcome-email";

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Use Supabase service role key for server inserts
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 👈 safer than anon
);

export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // 1️⃣ Save email to Supabase
    const { error } = await supabaseAdmin
      .from("waitlist_lookbook")
      .insert([{ email }]);
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
    }

    // 2️⃣ Send welcome email
    const data = await resend.emails.send({
      from: "ShowcaseHQ <onboarding@resend.dev>", // replace later with your domain
      to: email, // send to the person signing up
      subject: "✨ Welcome to ShowcaseHQ Waitlist",
      react: WelcomeEmail({ email }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("❌ Unknown error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}