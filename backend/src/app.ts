import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "./config/env";
import healthRoutes from "./routes/health.routes";
import chatRoutes from "./routes/chat.routes";
import contactRoutes from "./routes/contact.routes";

/* ─────────────────────────────────────────
   Express App Setup
   ───────────────────────────────────────── */

const app = express();

/* ── 1. CORS ── */
const ALLOWED_ORIGINS = [
  env.FRONTEND_URL,
  "https://web-sixlabs-1.onrender.com",
  "https://sixlabs.github.io",
  "https://web-sixlabs.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);
    return callback(new Error(`CORS blocked: ${origin}`));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ── 2. Body Parser ── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── 3. API Routes (Versioned) ── */
app.use("/api/v1", healthRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/contact", contactRoutes);
/* ── 4. 404 Handler ── */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

/* ── 5. Centralized Error Handler ── */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Error]", err);

  res.status(500).json({
    success: false,
    error: {
      code: "SERVER_ERROR",
      message:
        env.NODE_ENV === "development" ? err.message : "Internal server error",
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

export default app;
