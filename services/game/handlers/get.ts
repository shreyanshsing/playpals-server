import { PrismaClient } from "@prisma/client"
import { TypeOf, z } from "zod"
import { getAllGamesSchema } from "../schema/schema"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const { offset, limit } = getAllGamesSchema.parse(req.query);
        const _offset = offset || 0;
        const _limit = limit || 10;
    
        const response = await prisma.game.findMany({
            skip: _offset,
            take: _limit,
        });
        res.json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getGame = async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const game = await prisma.game.findUnique({
            where: {
                id: gameId,
            },
        });
        res.json(game);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}