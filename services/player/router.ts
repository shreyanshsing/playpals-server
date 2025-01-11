import { Router } from "express";
import { createPlayer } from "./handlers/post";
import { updatePlayer } from "./handlers/put";

const router = Router();

router.post("/", async (req, res) => await createPlayer(req, res));

router.put("/:id", async (req, res) => await updatePlayer(req, res));

export default router;