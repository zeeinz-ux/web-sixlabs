import { env } from "../../config/env";
import {
  AIProvider,
  AIRequestParams,
  AIResponse,
  AIProviderError,
} from "../types.js";
import { GeminiProvider } from "./providers/gemini.provider";
import { GroqProvider } from "./providers/groq.provider";

const MOCK_TEMPLATES = [
  "Terima kasih atas pesan Anda. Tim SixLabs akan segera merespons pertanyaan Anda.",
  "Halo! Saya asisten digital SixLabs. Ada yang bisa saya bantu terkait layanan kami?",
  "Kami menyediakan layanan Web Application, Mobile App, Company Profile, Landing Page, SEO, dan AI Integration. Mau tahu lebih lanjut?",
  "Silakan tinggalkan detail kebutuhan project Anda, tim kami akan menghubungi Anda segera.",
  "SixLabs siap membantu digitalisasi bisnis Anda dengan solusi modern dan scalable.",
];

function getDeterministicMock(message: string): string {
  const mode = env.CHAT_MOCK_MODE || "template";

  if (mode === "echo") {
    return `Echo: ${message}`;
  }

  const index = message.length % MOCK_TEMPLATES.length;
  return MOCK_TEMPLATES[index];
}

class MockFallbackProvider implements AIProvider {
  readonly name = "mock";

  get isAvailable(): boolean {
    return true;
  }

  async generateReply(params: AIRequestParams): Promise<AIResponse> {
    return {
      content: getDeterministicMock(params.message),
      provider: this.name,
    };
  }
}

export class AIFallbackService {
  private providers: AIProvider[];
  private mockProvider: MockFallbackProvider;

  constructor() {
    this.mockProvider = new MockFallbackProvider();
    // Fallback chain: Gemini → Groq → Mock (safety net)
    this.providers = [new GeminiProvider(), new GroqProvider()];

    // DEBUG: Log provider availability on init
    console.log("[AIFallback] Providers initialized:");
    this.providers.forEach((p) => {
      console.log(`  - ${p.name}: available=${p.isAvailable}`);
    });
  }

  async generateReply(params: AIRequestParams): Promise<AIResponse> {
    const availableProviders = this.providers.filter((p) => p.isAvailable);

    console.log(
      `[AIFallback] Available providers: ${availableProviders.length} (${availableProviders.map((p) => p.name).join(", ")})`,
    );

    if (availableProviders.length === 0) {
      console.log("[AIFallback] No providers available. Using mock.");
      return this.mockProvider.generateReply(params);
    }

    const errors: AIProviderError[] = [];

    for (const provider of availableProviders) {
      console.log(`[AIFallback] Trying provider: ${provider.name}`);
      try {
        const response = await provider.generateReply(params);
        console.log(`[AIFallback] Success from ${provider.name}`);
        return response;
      } catch (err) {
        console.error(`[AIFallback] ${provider.name} failed:`, err);

        if (this.isProviderError(err)) {
          errors.push(err);
          // FIX: Selalu continue ke provider berikutnya,
          // regardless of retryable. Retryable hanya untuk retry logic di luar.
          console.log(`[AIFallback] Continuing to next provider...`);
          continue;
        }

        // Non-structured error — wrap and continue
        errors.push({
          provider: provider.name,
          code: "UNKNOWN",
          message: err instanceof Error ? err.message : String(err),
          retryable: true,
        });
        continue;
      }
    }

    console.warn(
      "[AIFallback] All providers failed:",
      errors.map((e) => `${e.provider}:${e.code}(${e.message})`).join(" | "),
    );
    return this.mockProvider.generateReply(params);
  }

  private isProviderError(err: unknown): err is AIProviderError {
    return (
      typeof err === "object" &&
      err !== null &&
      "provider" in err &&
      "code" in err &&
      "retryable" in err
    );
  }
}
