import { Router } from "express";
import { getAllGames, getGame } from "./handlers/get";
import { createGame } from "./handlers/post";
import { updateGame } from "./handlers/put";

const router = Router();

router.get('/', async(req, res) => await getAllGames(req, res));

router.get('/:gameId', async(req, res) => await getGame(req, res));

router.post('/', async(req, res) => await createGame(req, res));

router.put('/:gameId', async(req, res) => await updateGame(req, res));

export default router;