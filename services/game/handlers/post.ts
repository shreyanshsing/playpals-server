import { z } from "zod";
import { createGameSchema } from "../schema/schema";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createGame = async (req: Request, res: Response) => {
    try {
        const game = createGameSchema.parse(req.body);
        const response = await prisma.game.create({
            data: {
                title: game.title,
            },
        });
        res.json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}