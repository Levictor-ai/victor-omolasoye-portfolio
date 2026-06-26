import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['omolasoyevictorakinyemi@gmail.com'],
      subject: `Portfolio message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
