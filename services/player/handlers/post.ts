import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createPlayerSchema } from "../schema/schema";

const prisma = new PrismaClient();

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name, gameServerId } = createPlayerSchema.parse(req.body);
    const player = await prisma.player.create({
      data: {
        name,
        gameServerId,
      },
    });
    await prisma.gameServer.update({
      where: {
        id: gameServerId,
      },
      data: {
        players: {
          connect: {
            id: player.id,
          },
        },
      },
    });
    res.json(player);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
