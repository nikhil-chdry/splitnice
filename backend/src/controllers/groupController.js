import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function create(req, res) {
  const { name, icon } = req.body;
  const userId = req.userId;

  if (!name) {
    return res.status(400).json({ error: 'Group name required' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name,
        icon: icon || '📝',
        leaderId: userId,
        members: {
          create: {
            userId,
            role: 'LEADER',
          },
        },
      },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function list(req, res) {
  const userId = req.userId;

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
        _count: {
          select: { expenses: true },
        },
      },
    });

    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const group = await prisma.group.findFirst({
      where: {
        id,
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
        expenses: {
          orderBy: { createdAt: 'desc' },
          include: {
            payer: { select: { id: true, name: true } },
            participants: {
              include: {
                user: { select: { id: true, name: true } },
              },
            },
          },
        },
        joinRequests: {
          where: { status: 'PENDING' },
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}