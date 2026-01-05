import express, { Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Backend is running 🚀" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
