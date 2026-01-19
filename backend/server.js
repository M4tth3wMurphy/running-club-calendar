import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import raceRoutes from "./routes/races.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

app.use("/api/races", raceRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
