// src/app/emails/WelcomeEmail.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Heading,
  Img,
  Hr,
} from "@react-email/components";

type WelcomeEmailProps = {
  email: string;
};

export default function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ShowcaseHQ ✨</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Img
            src="/LOGO.png" // 👉 replace with hosted ShowcaseHQ logo
            width="120"
            height="120"
            alt="ShowcaseHQ Logo"
            style={logo}
          />

          {/* Hero heading */}
          <Heading style={h1}>✨ Welcome to ShowcaseHQ</Heading>

          <Text style={text}>
            Hi <strong>{email}</strong>,
          </Text>

          <Text style={text}>
            Thanks for joining the <strong>ShowcaseHQ waitlist</strong> 🎉  
            You’re now one step closer to creating <em>stunning digital lookbooks</em> 
            that you can share instantly with buyers, clients, and followers.
          </Text>

          <Text style={highlight}>
            🚀 You’ll be the first to know when early access opens.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            You’re receiving this email because you signed up at{" "}
            <a href="https://showcasehq.com" style={{ color: "#ec4899" }}>
              showcasehq.com
            </a>
            .  
            <br />
            Follow us:{" "}
            <a href="https://twitter.com/showcasehq" style={{ color: "#60a5fa" }}>
              Twitter
            </a>{" "}
            ·{" "}
            <a href="https://instagram.com/showcasehq" style={{ color: "#ec4899" }}>
              Instagram
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// === Styles ===
const main = {
  backgroundColor: "#0a0030",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const container = {
  backgroundColor: "#120040",
  margin: "40px auto",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
  maxWidth: "520px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 20px",
};

const h1 = {
  fontSize: "26px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "white",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#d1d5db",
  margin: "16px 0",
};

const highlight = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#ec4899", // pink accent
  marginTop: "20px",
};

const hr = {
  borderColor: "#2d2d55",
  margin: "32px 0",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
};