import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.RECIPIENT_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ error: 'Mail server not configured.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${gmailUser}>`,
    to: recipient,
    replyTo: email,
    subject: subject || 'Portfolio Inquiry',
    text: `Sender: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family: monospace; padding: 20px; background: #000; color: #fff; border: 1px solid #333;">
        <h2 style="color: #fff; border-bottom: 2px solid #fff; padding-bottom: 10px;">New Portfolio Inquiry</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'Portfolio Inquiry'}</p>
        <hr style="border-color: #333;" />
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
