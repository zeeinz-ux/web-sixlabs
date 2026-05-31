import { env } from "../../config/env";
import {
  AIProvider,
  AIRequestParams,
  AIResponse,
  AIProviderError,
} from "../types.js";
import { GeminiProvider } from "./providers/gemini.provider";

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
    this.providers = [new GeminiProvider()];
  }

  async generateReply(params: AIRequestParams): Promise<AIResponse> {
    const availableProviders = this.providers.filter((p) => p.isAvailable);

    if (availableProviders.length === 0) {
      return this.mockProvider.generateReply(params);
    }

    const errors: AIProviderError[] = [];

    for (const provider of availableProviders) {
      try {
        const response = await provider.generateReply(params);
        return response;
      } catch (err) {
        if (this.isProviderError(err)) {
          errors.push(err);
          if (!err.retryable) {
            continue;
          }
        }
      }
    }

    console.warn(
      "[AIFallback] All providers failed:",
      errors.map((e) => `${e.provider}:${e.code}`).join(", "),
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
