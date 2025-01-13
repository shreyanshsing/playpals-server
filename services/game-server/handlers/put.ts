import { PrismaClient } from "@prisma/client";
import { updateGameServerSchema } from "../schema/schema";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateGameServer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = updateGameServerSchema.parse(req.body);
    const gameServer = await prisma.gameServer.findUnique({
        where: {
            id: id,
        },
    });
    const winners = gameServer?.winner ? gameServer.winner: [];
    //only store last 5 games winners
    if (winners.length > 5) {
        winners.shift();
    }
    if (body.winner) {
        winners.push(body.winner);
    }
    const response = await prisma.gameServer.update({
      where: {
        id: id,
      },
      data: {
        status: body.status,
        winner: winners,
      }
    });
    res.json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
