import { Router } from "express";
import { getSignedImageUrl } from "../utils/getSignedImageUrl";
import { getAllPlayers } from "../controllers/playerController";

const router = Router();

router.get("/players", getAllPlayers);

router.get("/", async (_req, res) => {
    const players = [
        {
            id: 1,
            name: "John Doe",
            age: 25,
            points: 4124,
            imageKey: "players/player-1.jpg",
        },
    ];

    const playersWithImages = await Promise.all(
        players.map(async (player) => ({
            ...player,
            imageUrl: await getSignedImageUrl(player.imageKey),
        }))
    );

    res.json(playersWithImages);
});


export default router;
