import { Request, Response } from "express";
import { Player } from "../models/player";
// import {playerImg1} from "../../data/images/playerImg1.jpg";


const players: Player[] = [
    { id: 1, image: "../../data/images/playerImg1.jpg", name: "Alfpiu", age: 34, points: 4124 },

];

export const getAllPlayers = (_req: Request, res: Response) => {
    res.json(players);
};
