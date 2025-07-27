import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, service } = body;

    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ message: "Missing required fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const adminMail = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: "🚨 New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
      `,
    };

    const userMail = {
      from: GMAIL_USER,
      to: email,
      subject: "✅ We've received your message",
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <hr />
        <p><strong>Your Submitted Details:</strong></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <br/>
        <p>Best,<br/>Cube Infotech Team</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    return new Response(JSON.stringify({ message: "Emails sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to send emails." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
