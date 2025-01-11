import { PrismaClient } from "@prisma/client";
import { updatePlayerSchema } from "../schema/schema";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { color, symbol } = updatePlayerSchema.parse(req.body);
    const player = await prisma.player.update({
      where: { id },
      data: { color, symbol },
    });
    await prisma.gameServer.update({
      where: { id: player.gameServerId },
      data: { players: { connect: { id: player.id } } },
    });
    res.json(player);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
