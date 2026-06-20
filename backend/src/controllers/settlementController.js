import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function create(req, res) {
  const { toUserId, amount, groupId } = req.body;
  const fromUserId = req.userId;

  if (!toUserId || !amount) {
    return res.status(400).json({ error: 'Recipient and amount required' });
  }

  try {
    const settlement = await prisma.settlement.create({
      data: {
        fromUserId,
        toUserId,
        amount: Math.round(amount * 100),
        groupId,
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(settlement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function list(req, res) {
  const userId = req.userId;

  try {
    const settlements = await prisma.settlement.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
        group: { select: { id: true, name: true } },
      },
    });

    res.json(settlements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}