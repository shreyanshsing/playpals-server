import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateGameStatus = async (gameId: string, status: string) => {
    try {
        await prisma.gameServer.update({
            where: { id: gameId },
            data: { status },
        });

        console.log(`Game ${gameId} status updated to ${status}`);
    } catch (error) {
        console.error(error);
    }
}

export const getGameStatus = async (gameId: string) => {
    try {
        const game = await prisma.gameServer.findUnique({
            where: { id: gameId },
        });

        return game?.status;
    } catch (error) {
        console.error(error);
    }
}

export const updatePlayer = async (playerId: string, symbol?: string, color?: string) => {
    try {
        await prisma.player.update({
            where: { id: playerId },
            data: { symbol, color },
        });
        console.log(`Player ${playerId} updated with symbol ${symbol} and color ${color}`);
    } catch (error) {
        console.error(error);
    }
}