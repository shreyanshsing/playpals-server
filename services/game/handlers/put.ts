import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { updateGameSchema } from "../schema/schema";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateGame = async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const game = updateGameSchema.parse(req.body);
        const response = await prisma.game.update({
            where: {
                id: gameId,
            },
            data: {
                title: game?.title,
                rules: game?.rules,
                rating: game?.rating,
            },
        });
        res.json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}