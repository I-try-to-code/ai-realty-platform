import { Router, Response } from "express";
import { prisma } from "../db";
import { authenticateToken, AuthRequest } from "../middlewares/auth";
import { MessageSenderType } from "@prisma/client";

const router = Router();

/**
 * GET /api/messages/sessions
 * Get list of all active chat sessions the current user participates in
 */
router.get("/sessions", authenticateToken, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  try {
    const participantSessions = await prisma.chatParticipant.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            participants: {
              include: {
                user: {
                  select: { id: true, name: true, role: true }
                }
              }
            },
            messages: {
              take: 1,
              orderBy: { createdAt: "desc" }
            }
          }
        }
      }
    });

    const sessions = participantSessions.map(p => p.session);
    return res.json(sessions);
  } catch (error) {
    console.error("[chat sessions error]", error);
    return res.status(500).json({ error: "Failed to retrieve chat sessions." });
  }
});

/**
 * GET /api/messages/:sessionId
 * Fetch conversation messages for a chat session (Checks participant access)
 */
router.get("/:sessionId", authenticateToken, async (req: AuthRequest, res: Response) => {
  const { sessionId } = req.params;
  const { id: userId, role } = req.user!;

  try {
    // 1. Verify user is a participant or is an admin
    if (role !== "ADMIN") {
      const isParticipant = await prisma.chatParticipant.findUnique({
        where: {
          sessionId_userId: { sessionId, userId }
        }
      });

      if (!isParticipant) {
        return res.status(403).json({ error: "Forbidden. You are not a participant in this conversation." });
      }
    }

    // 2. Retrieve messages
    const messages = await prisma.message.findMany({
      where: { sessionId },
      include: {
        sender: {
          select: { id: true, name: true, role: true }
        }
      },
      orderBy: { createdAt: "asc" }
    });

    return res.json(messages);
  } catch (error) {
    console.error("[messages get error]", error);
    return res.status(500).json({ error: "Failed to retrieve messages." });
  }
});

/**
 * POST /api/messages
 * Send a message within a chat session
 */
router.post("/", authenticateToken, async (req: AuthRequest, res: Response) => {
  const { sessionId, content } = req.body;
  const { id: senderId, role } = req.user!;

  if (!sessionId || !content) {
    return res.status(400).json({ error: "Session ID and message content are required." });
  }

  try {
    // 1. Verify session exists and sender is participant
    const isParticipant = await prisma.chatParticipant.findUnique({
      where: {
        sessionId_userId: { sessionId, userId: senderId }
      }
    });

    if (!isParticipant) {
      return res.status(403).json({ error: "Forbidden. You are not a participant in this conversation." });
    }

    // Map sender role to MessageSenderType enum
    let senderType: MessageSenderType = MessageSenderType.USER;
    if (role === "SUBAGENT") senderType = MessageSenderType.SUBAGENT;
    if (role === "ADMIN") senderType = MessageSenderType.ADMIN;

    // 2. Create message
    const message = await prisma.message.create({
      data: {
        sessionId,
        senderId,
        senderType,
        content
      },
      include: {
        sender: {
          select: { id: true, name: true, role: true }
        }
      }
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error("[message send error]", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
});

export default router;
