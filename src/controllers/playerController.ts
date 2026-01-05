import { Request, Response } from "express";
import { Player } from "../models/player"


const players: Player[] = [
    { id: 1, name: "Alice", age: 25, points: 4124 },
    { id: 2, name: "Bob", age: 28, points: 3980 },
    { id: 3, name: "Charlie", age: 22, points: 3850 },
];

export const getAllPlayers = (_req: Request, res: Response) => {
    res.json(players);
};
