import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../services/emailService.js';

const prisma = new PrismaClient();

export async function requestReset(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Don't reveal if email exists — security best practice
    return res.json({ message: 'If an account exists, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordReset.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  const result = await sendPasswordResetEmail(email, token);

  if (!result.success) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  res.json({ message: 'If an account exists, a reset link has been sent.' });
}

export async function verifyToken(req, res) {
  const { token } = req.query;

  const reset = await prisma.passwordReset.findUnique({
    where: { token },
  });

  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  res.json({ valid: true, email: reset.email });
}

export async function resetPassword(req, res) {
  const { token, password } = req.body;

  const reset = await prisma.passwordReset.findUnique({
    where: { token },
  });

  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: reset.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordReset.update({
    where: { token },
    data: { used: true },
  });

  res.json({ message: 'Password reset successful' });
}