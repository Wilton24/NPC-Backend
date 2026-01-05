import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes"

dotenv.config();

const app = express();
export const PORT = Number(process.env.PORT) || 3001;

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());


// Routes
app.use("/player", playerRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Backend is running :D" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
