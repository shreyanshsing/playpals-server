import { z } from "zod";

export const getAllGamesSchema = z.object({
    offset: z.number().optional(),
    limit: z.number().optional(),
});

export const createGameSchema = z.object({
    title: z.string(),
});

export const updateGameSchema = z.object({
    title: z.string().optional(),
    rules: z.array(z.string()).optional(),
    rating: z.number().optional(),
});