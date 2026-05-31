import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(4000, "Message exceeds 4000 character limit"),
  sessionId: z
    .string()
    .min(8, "Session ID too short")
    .max(128, "Session ID too long")
    .optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .max(20, "History exceeds 20 messages")
    .optional(),
});

export const chatResponseSchema = z.object({
  id: z.string(),
  role: z.enum(["assistant"]),
  content: z.string(),
  createdAt: z.string().datetime(),
  provider: z.string(),
  status: z.enum(["sent", "error"]),
  sessionId: z.string(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
