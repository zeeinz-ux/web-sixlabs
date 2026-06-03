import { env } from "../../../config/env";
import { SIXLABS_SYSTEM_PROMPT } from "../systemPrompt";
import type {
  AIProvider,
  AIRequestParams,
  AIResponse,
  AIProviderError,
} from "../../types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const TIMEOUT_MS = 15000;

export class GroqProvider implements AIProvider {
  readonly name = "groq";

  get isAvailable(): boolean {
    return !!env.GROQ_API_KEY;
  }

  async generateReply(params: AIRequestParams): Promise<AIResponse> {
    if (!this.isAvailable) {
      throw this.createError(
        "NOT_AVAILABLE",
        "Groq API key not configured",
        false,
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(this.buildPayload(params)),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: any = await response.json().catch(() => ({}));
        const code = this.mapHttpStatus(response.status);
        throw this.createError(
          code,
          errorData?.error?.message || `Groq API returned ${response.status}`,
          code === "RATE_LIMIT" || code === "TIMEOUT",
        );
      }

      const data: any = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw this.createError(
          "EMPTY_RESPONSE",
          "No content in Groq response",
          false,
        );
      }

      return {
        content: content.trim(),
        provider: this.name,
      };
    } catch (err) {
      clearTimeout(timeoutId);

      const error = err as any;

      if (error instanceof Error && error.name === "AbortError") {
        throw this.createError(
          "TIMEOUT",
          "Groq request timed out after 15s",
          true,
        );
      }

      if (this.isProviderError(error)) {
        throw error;
      }

      throw this.createError(
        "UNKNOWN",
        error instanceof Error ? error.message : "Unknown Groq error",
        true,
      );
    }
  }

  private buildPayload(params: AIRequestParams): object {
    const messages: Array<{ role: string; content: string }> = [
      {
        role: "system",
        content: SIXLABS_SYSTEM_PROMPT,
      },
    ];

    if (params.history && params.history.length > 0) {
      for (const msg of params.history) {
        messages.push({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        });
      }
    }

    messages.push({
      role: "user",
      content: params.message,
    });

    return {
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    };
  }

  private createError(
    code: string,
    message: string,
    retryable: boolean,
  ): AIProviderError {
    return { provider: this.name, code, message, retryable };
  }

  private isProviderError(err: unknown): err is AIProviderError {
    return (
      typeof err === "object" &&
      err !== null &&
      "provider" in err &&
      "code" in err
    );
  }

  private mapHttpStatus(status: number): string {
    if (status === 429) return "RATE_LIMIT";
    if (status === 401 || status === 403) return "AUTH_ERROR";
    if (status >= 500) return "SERVER_ERROR";
    return "REQUEST_ERROR";
  }
}
