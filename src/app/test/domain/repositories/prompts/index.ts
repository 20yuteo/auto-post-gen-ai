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
}
