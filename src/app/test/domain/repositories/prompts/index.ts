import {
  PromptInput,
  PromptsRepository,
} from "@/app/domain/repositories/prompts";

export class PromptsRepositoryEmpty implements PromptsRepository {
  create(): Promise<void> {
    return Promise.resolve();
  }

  findAll(): Promise<PromptInput[]> {
    return Promise.resolve([]);
  }

  findById(id: string): Promise<PromptInput> {
    return Promise.resolve({
      id: "1",
      userId: "1",
      title: "test",
      content: "test",
    });
  }
}
