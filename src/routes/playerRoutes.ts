import { Router } from "express";
import { getAllPlayers } from "../controllers/playerController";

const router = Router();

router.get("/players", getAllPlayers);

export default router;
