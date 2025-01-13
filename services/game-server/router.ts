import { Router } from "express";
import { createGameServer } from "./handlers/post";
import { getGameServer } from "./handlers/get";
import { updateGameServer } from "./handlers/put";

const router = Router();

router.get('/:id', async(req, res) => await getGameServer(req, res));
router.post('/', async(req, res) => await createGameServer(req, res));
router.put('/:id', async(req, res) => await updateGameServer(req, res));

export default router;