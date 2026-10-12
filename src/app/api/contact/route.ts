import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';
const TO = process.env.CONTACT_TO_EMAIL ?? 'omolasoyevictorakinyemi@gmail.com';

export async function POST(req: Request) {
  try {
    const { name, email, message, company } = await req.json();

    if (company) {
      return Response.json({ ok: true });
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!EMAIL_RE.test(email.trim())) {
      return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (name.length > 120 || email.length > 200 || message.length > 4000) {
      return Response.json({ error: 'Message is too long' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `Portfolio message from ${name.trim()}`,
      replyTo: email.trim(),
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
