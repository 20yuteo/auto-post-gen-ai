import type { LLMRepository } from "@/app/domain/repositories/llm";

export class LLMRepositoryEmpty implements LLMRepository {
  generateContent(text: string): Promise<string> {
    return Promise.resolve("");
  }
}
