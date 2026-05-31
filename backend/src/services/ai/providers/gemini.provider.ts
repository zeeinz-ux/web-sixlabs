import { env } from "../../../config/env";
import {
  AIProvider,
  AIRequestParams,
  AIResponse,
  AIProviderError,
}  from "../types.js";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent";
const TIMEOUT_MS = 15000;

export class GeminiProvider implements AIProvider {
  readonly name = "gemini";

  get isAvailable(): boolean {
    return !!env.GEMINI_API_KEY;
  }

  async generateReply(params: AIRequestParams): Promise<AIResponse> {
    if (!this.isAvailable) {
      throw this.createError(
        "NOT_AVAILABLE",
        "Gemini API key not configured",
        false,
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.buildPayload(params)),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const code = this.mapHttpStatus(response.status);
        throw this.createError(
          code,
          errorData?.error?.message || `Gemini API returned ${response.status}`,
          code === "RATE_LIMIT" || code === "TIMEOUT",
        );
      }

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw this.createError(
          "EMPTY_RESPONSE",
          "No content in Gemini response",
          false,
        );
      }

      return {
        content: content.trim(),
        provider: this.name,
      };
    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === "AbortError") {
        throw this.createError(
          "TIMEOUT",
          "Gemini request timed out after 15s",
          true,
        );
      }

      if (this.isProviderError(err)) {
        throw err;
      }

      throw this.createError(
        "UNKNOWN",
        err instanceof Error ? err.message : "Unknown Gemini error",
        true,
      );
    }
  }

  private buildPayload(params: AIRequestParams): object {
    const contents = [];

    if (params.history && params.history.length > 0) {
      for (const msg of params.history) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: params.message }],
    });

    return {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
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
