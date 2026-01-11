import { Request, Response } from "express";
import { Player } from "../models/player";
// import {playerImg1} from "../../data/images/playerImg1.jpg";


const players: Player[] = [
    { id: 1, image: `http://localhost:3001/images/playerImg1.jpg`, name: "Alfpiu", age: 34, points: 4124 },
    { id: 2, image: `http://localhost:3001/images/playerImg2.jpg`, name: "RonnSkie", age: 27, points: 4012 },
    { id: 3, image: `http://localhost:3001/images/playerImg3.jpg`, name: "Jay Rome", age: 39, points: 3782 },
    { id: 4, image: `http://localhost:3001/images/playerImg4.jpg`, name: "Acrhie Voxx", age: 42, points: 2836 },

];

export const getAllPlayers = (_req: Request, res: Response) => {
    res.json(players);
};
