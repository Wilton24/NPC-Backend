import { Request, Response } from "express";
import { pool } from "../config/db";


const S3_BASE_URL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`

export const getAllPlayers = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM players ORDER BY points DESC");
        const playersWithImages = result.rows.map(player => ({
            ...player,
            image: `${S3_BASE_URL}/${player.image_key || player.image_filename}`,
        }));

        res.status(200).json(playersWithImages);
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};


export const getPlayerById = async (req: Request, res: Response) => {
    try {
        const playerId = parseInt(req.params.id, 10);
        if (isNaN(playerId)) {
            return res.status(400).json({ message: "Invalid player ID" });
        }

        const result = await pool.query("SELECT * FROM players WHERE id = $1", [playerId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Player not found" });
        }

        const player = result.rows[0];

        res.status(200).json({
            ...player,
            image: `${S3_BASE_URL}/${player.image_key || player.image_filename}`
        });
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ message: "Database error", error });
    }
};
