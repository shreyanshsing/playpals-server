import { z } from "zod";

export const createGameServerSchema = z.object({
    gameId: z.string(),
});