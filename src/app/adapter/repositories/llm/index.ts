import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMRepository } from "@/app/domain/repositories/llm";

export class LLMRepositoryImpl implements LLMRepository {
  async generateContent(prompt: string): Promise<string> {
    const googleGenerativeAI = new GoogleGenerativeAI(
      process.env.GOOGLE_API_KEY || ""
    );
    const model = googleGenerativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const response = await model.generateContent(prompt);
    console.log(response.response.text());
    return response.response.text();
  }
}
