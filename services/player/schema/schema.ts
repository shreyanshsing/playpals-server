import { symbol, z } from "zod";

export const createPlayerSchema = z.object({
  name: z.string(),
  gameServerId: z.string(),
});


export const updatePlayerSchema = z.object({
  color: z.string().optional(),
  symbol: z.string().optional(),
});