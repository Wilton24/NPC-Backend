import path from "path";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes"
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
export const PORT = Number(process.env.PORT) || 3001;

console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD, typeof process.env.PG_PASSWORD);
console.log("PG_DB:", process.env.PG_DB);

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
