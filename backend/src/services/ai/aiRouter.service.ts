import { AIFallbackService } from "./aiFallback.service";
import { AIRequestParams } from "../types.js";

export interface ChatRouterResponse {
  id: string;
  role: "assistant";
  content: string;
  createdAt: string;
  provider: string;
  status: "sent";
  sessionId: string;
}

export class AIRouterService {
  private fallbackService: AIFallbackService;

  constructor() {
    this.fallbackService = new AIFallbackService();
  }

  async processChatMessage(params: {
    message: string;
    sessionId: string;
    history?: Array<{ role: "user" | "assistant"; content: string }>;
  }): Promise<ChatRouterResponse> {
    const aiParams: AIRequestParams = {
      message: params.message,
      history: params.history,
    };

    const aiResponse = await this.fallbackService.generateReply(aiParams);

    return {
      id: this.generateId(),
      role: "assistant",
      content: aiResponse.content,
      createdAt: new Date().toISOString(),
      provider: aiResponse.provider,
      status: "sent",
      sessionId: params.sessionId,
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
