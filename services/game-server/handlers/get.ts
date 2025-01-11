import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getGameServer = async (req: Request, res: Response) => {
  try {
    const gameServer = await prisma.gameServer.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        players: {
          orderBy: {
            createdAt: "asc",
          }
        }
      },
    });
    res.json(gameServer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
