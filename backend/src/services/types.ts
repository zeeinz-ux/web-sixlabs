export interface AIRequestParams {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface AIResponse {
  content: string;
  provider: string;
}

export interface AIProviderError {
  provider: string;
  code: string;
  message: string;
  retryable: boolean;
}

export interface AIProvider {
  readonly name: string;
  readonly isAvailable: boolean;

  generateReply(params: AIRequestParams): Promise<AIResponse>;
  summarize?(text: string): Promise<string>;
  healthCheck?(): Promise<boolean>;
}
