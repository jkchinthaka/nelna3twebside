import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { randomUUID } from "crypto";
import searchRouter from "./routes/search";
import adminRouter from "./routes/admin";
import { ensureIndexes } from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const requestId = randomUUID();
  const start = Date.now();

  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms ${requestId}`
    );
  });

  next();
});

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", (_req, res) => {
  const memory = process.memoryUsage();
  res.json({
    status: "ok",
    uptimeSeconds: process.uptime(),
    memory: {
      rss: memory.rss,
      heapTotal: memory.heapTotal,
      heapUsed: memory.heapUsed
    },
    timestamp: new Date().toISOString()
  });
});

app.use("/api", searchRouter);
app.use("/api/admin", adminRouter);

async function startServer() {
  await ensureIndexes();

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
