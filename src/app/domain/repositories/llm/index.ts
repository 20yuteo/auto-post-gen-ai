export interface LLMRepository {
	generateContent: (prompt: string) => Promise<string>;
}
