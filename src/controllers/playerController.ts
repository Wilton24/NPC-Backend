import { Request, Response } from "express";
import { Player } from "../models/player";
import { pool } from "../config/db";

const players: Player[] = [
    { id: 1, image: `http://localhost:3001/images/playerImg1.jpg`, name: "Alfpiu", age: 34, points: 4124 },
    { id: 2, image: `http://localhost:3001/images/playerImg2.jpg`, name: "RonnSkie", age: 27, points: 4012 },
    { id: 3, image: `http://localhost:3001/images/playerImg3.jpg`, name: "Jay Rome", age: 39, points: 3782 },
    { id: 4, image: `http://localhost:3001/images/playerImg4.jpg`, name: "Acrhie Voxx", age: 42, points: 2836 },

];

export const getAllPlayers = (_req: Request, res: Response) => {
    res.json(players);
};


export const getPlayerById = async (req: Request, res: Response) => {
    const playerId = parseInt(req.params.id, 10);

    try {
        const result = await pool.query("SELECT * FROM players WHERE id = $1", [playerId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}