import { Router } from "express";
import { createGameServer } from "./handlers/post";
import { getGameServer } from "./handlers/get";

const router = Router();

router.get('/:id', async(req, res) => await getGameServer(req, res));
router.post('/', async(req, res) => await createGameServer(req, res));

export default router;