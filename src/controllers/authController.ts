import { Request, Response } from "express";
import { hashPassword } from "../utils/hash";
import { User } from "../models/User";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";


let users: User[] = [];
let userIdCounter = 1;

console.log("USERS:", users);

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

    // Temporary response for testing
    // const { email, password } = req.body;
    // res.status(200).json({ emalens: email, passwordens: password });
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
