import { z } from "zod";

export const createGameServerSchema = z.object({
    gameId: z.string(),
});

export const updateGameServerSchema = z.object({
    status: z.string().optional(),
    winner: z.string().optional(),
});