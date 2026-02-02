import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes"
import authRoutes from "./routes/authRoutes";


const app = express();
export const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/test", (_req: Request, res: Response) => {
    res.json({ message: "Test endpoint working!" });
});


// Routes
app.use("/api", playerRoutes);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on portskie ${PORT}`);
});
