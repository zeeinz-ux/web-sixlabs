import { Request, Response } from "express";
import { chatRequestSchema } from "../schemas/chat.schema";
import { AIRouterService } from "../services/ai/aiRouter.service";

// ─────────────────────────────────────────────
// TODO: Tahap 5 — Firestore Logging
//   • Log user message + assistant response ke Firestore
// TODO: Tahap 6 — Google Sheets Sync
//   • Append row ke backup sheet untuk audit trail
// TODO: Tahap 7 — Rate Limiting & Analytics
//   • Integrasi rateLimit.middleware.ts
//   • Collect metrics: responseTime, providerUsed, sessionCount
// ─────────────────────────────────────────────

const aiRouter = new AIRouterService();

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: parsed.error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join("; "),
            isRetryable: false,
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        });
      }

      const { message, sessionId: clientSessionId, history } = parsed.data;
      const sessionId =
        clientSessionId ||
        `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const truncatedHistory = history ? history.slice(-20) : [];

      const response = await aiRouter.processChatMessage({
        message,
        sessionId,
        history: truncatedHistory,
      });

      return res.status(200).json({
        success: true,
        data: response,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      // Internal AI errors never exposed raw to frontend
      console.error("[ChatController] AI processing failed:", err);

      return res.status(500).json({
        success: false,
        error: {
          code: "AI_PROVIDER_ERROR",
          message:
            "AI service temporarily unavailable. Please try again later.",
          isRetryable: true,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    }
  },
};
