import { config } from "dotenv";
import { z } from "zod";

/* ── Load .env once at module init ── */
config();

/* ── Zod Schema ── */
const envSchema = z.object({
  // Server (Required)
  PORT: z.coerce.number().min(1).max(65535).default(5000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  FRONTEND_URL: z.string().min(1).default("http://localhost:5173"),

  // AI Provider API Keys (Tahap 4 — optional, auto-activates provider if present)
  GEMINI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  HF_API_KEY: z.string().optional(),
  MISTRAL_API_KEY: z.string().optional(),
  COHERE_API_KEY: z.string().optional(),

  // Chat Fallback Mode (Tahap 3–4)
  CHAT_MOCK_MODE: z.enum(["template", "echo"]).optional(),

  // Firebase (Tahap 5 — Firestore Logging)
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),

  // Google Sheets (Tahap 6 — Sheets Sync)
  GOOGLE_SHEETS_ID: z.string().optional(),

  // Security (Tahap 7 — Auth & Rate Limiting)
  JWT_SECRET: z.string().optional(),
});

/* ── Parse & Validate ── */
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  parsed.error.issues.forEach((issue) => {
    console.error(`   ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

/* ── Single Source of Truth ── */
export const env = parsed.data;
