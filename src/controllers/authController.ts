import { Request, Response } from "express";
import { hashPassword } from "../utils/hash";
import { User } from "../models/User";

let users: User[] = [];
let userIdCounter = 1;

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser: User = {
            id: userIdCounter++,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        users.push(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
