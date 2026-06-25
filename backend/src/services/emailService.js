import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'onboarding@resend.dev'; // Resend's test domain

export async function sendPasswordResetEmail(toEmail, resetToken) {
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: 'Reset your Splitnice password',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#123f3a;color:#fff;text-decoration:none;border-radius:8px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Email send failed:', err);
    return { success: false, error: err.message };
  }
}

export async function sendReminderEmail(toEmail, reminderData) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: 'Payment Reminder - Splitnice',
      html: `
        <h2>Payment Reminder</h2>
        <p>${reminderData.message}</p>
        <p>Log in to settle up: <a href="http://localhost:5173">Splitnice</a></p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Reminder email failed:', err);
    return { success: false, error: err.message };
  }
}