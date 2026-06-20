import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function create(req, res) {
  const { title, amount, groupId, payerId, splitMethod, participants } = req.body;
  const userId = req.userId;

  if (!title || !amount || !groupId || !splitMethod || !participants) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const membership = await prisma.groupMember.findFirst({
      where: { groupId, userId },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this group' });
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Math.round(amount * 100),
        groupId,
        payerId: payerId || userId,
        creatorId: userId,
        splitMethod,
        participants: {
          create: participants.map((p) => ({
            userId: p.userId,
            share: Math.round(p.share * 100),
          })),
        },
      },
      include: {
        payer: { select: { id: true, name: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function list(req, res) {
  const userId = req.userId;

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        group: {
          members: {
            some: { userId },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        payer: { select: { id: true, name: true } },
        group: { select: { id: true, name: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getById(req, res) {
  const { id } = req.params;

  try {
    const expense = await prisma.expense.findUnique({
      where: { id },
      include: {
        payer: { select: { id: true, name: true } },
        group: { select: { id: true, name: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { title, amount, splitMethod, participants } = req.body;

  try {
    await prisma.expenseParticipant.deleteMany({
      where: { expenseId: id },
    });

    const expense = await prisma.expense.update({
      where: { id },
      data: {
        title,
        amount: amount ? Math.round(amount * 100) : undefined,
        splitMethod,
        participants: {
          create: participants.map((p) => ({
            userId: p.userId,
            share: Math.round(p.share * 100),
          })),
        },
      },
      include: {
        payer: { select: { id: true, name: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteExpense(req, res) {
  const { id } = req.params;

  try {
    await prisma.expense.delete({
      where: { id },
    });

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}