import {
  PromptInput,
  PromptsRepository,
} from "@/app/domain/repositories/prompts";

export class PromptsRepositoryEmpty implements PromptsRepository {
  create(): Promise<PromptInput> {
    return Promise.resolve({
      id: "1",
      userId: "1",
      title: "test",
      content: "test",
    });
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

  findByUserId(userId: string): Promise<PromptInput[]> {
    return Promise.resolve([]);
  }

  update(): Promise<void> {
    return Promise.resolve();
  }
}
