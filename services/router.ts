import { Router } from "express";
import GameRouter from "./game/router";
import GameServerRouter from "./game-server/router";
import PlayerRouter from "./player/router";

const router = Router();

router.use('/game', GameRouter);

router.use('/game-server', GameServerRouter);

router.use('/player', PlayerRouter);

export default router;