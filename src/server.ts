import "dotenv/config";
import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes"
import authRoutes from "./routes/authRoutes";


const app = express();
export const PORT = Number(process.env.PORT) || 3001;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth", authRoutes);


// Routes
app.use("/api", playerRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Backend is running :D" });
});


// DUMMY DATA for testing
app.use("/images", express.static(path.join(__dirname, "../data/images")));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
