import { Router } from "express";
import { Request, Response } from "express";
// import { getSignedImageUrl } from "../utils/getSignedImageUrl";
import { getAllPlayers } from "../controllers/playerController";
import { getPlayerById } from "../controllers/playerController";

const router = Router();

router.get("/players", getAllPlayers);


router.get("/players/:id", async (req: Request, res: Response) => {
    await getPlayerById(req, res);
});








// router.get("/", async (_req, res) => {
//     const players = [
//         {
//             id: 1,
//             name: "John Doe",
//             age: 25,
//             points: 4124,
//             imageKey: "playerImg1.jpg",
//         },
//     ];

//     const playersWithImages = await Promise.all(
//         players.map(async (player) => ({
//             ...player,
//             imageUrl: await getSignedImageUrl(player.imageKey),
//         }))
//     );

//     res.json(playersWithImages);
// });


export default router;
