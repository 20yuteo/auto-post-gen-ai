import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMRepository } from "@/app/domain/repositories/llm";

export class LLMRepositoryImpl implements LLMRepository {
  async generateContent(prompt: string): Promise<string> {
    try {
      const googleGenerativeAI = new GoogleGenerativeAI(
        process.env.GOOGLE_API_KEY || ""
      );
      const model = googleGenerativeAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const response = await model.generateContent(prompt);
      return response.response.text();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
