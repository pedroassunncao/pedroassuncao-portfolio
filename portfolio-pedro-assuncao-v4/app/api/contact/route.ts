import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = normalizeText(body.name, 80).replace(/[\r\n]+/g, " ");
    const email = normalizeText(body.email, 254);
    const message = normalizeText(body.message, 4000);
    const website = normalizeText(body.website, 200);

    // Campo invisível para visitantes reais. Se vier preenchido, tratamos como bot.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (name.length < 2 || !EMAIL_PATTERN.test(email) || message.length < 10) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.CONTACT_FROM || "Portfolio Pedro <onboarding@resend.dev>";

    if (!apiKey || !contactEmail) {
      console.error("Contact form is missing RESEND_API_KEY or CONTACT_EMAIL.");
      return NextResponse.json({ error: "Contact service is not configured" }, { status: 503 });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        reply_to: email,
        subject: `Portfolio • nova mensagem de ${name}`,
        text: [
          "Nova mensagem recebida pelo seu portfólio.",
          "",
          `Nome: ${name}`,
          `E-mail para resposta: ${email}`,
          "",
          "Mensagem:",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error("Resend contact error:", resendResponse.status, details.slice(0, 500));
      return NextResponse.json({ error: "Email provider rejected the request" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}
