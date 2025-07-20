import express, { Request, Response } from "express";
import partnerRoutes from "./routes/partner";

import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { log } from "console";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
dotenv;
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleDateString()}] method: ${req.method} url: ${
      req.url
    } body: ${JSON.stringify(req.body)}`
  );
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/api/partner", partnerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
