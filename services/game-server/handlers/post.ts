import { Request, Response } from "express";
import { createGameServerSchema } from "../schema/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGameServer = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const body = createGameServerSchema.parse(req.body);
        const response = await prisma.gameServer.create({
            data: {
                gameId: body.gameId,
            }
        });
        res.json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}