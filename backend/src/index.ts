import express, { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import partnerRoutes from "./routes/partner";
import stockRoutes from "./routes/stock";
import salesRoutes from "./routes/sales";
import feedRoutes from "./routes/feed";

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
app.use("/api/stock", stockRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/feed", feedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
