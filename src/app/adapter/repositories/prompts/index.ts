import { dbClient } from "@/app/configs";
import {
  PromptsRepository,
  PromptType,
} from "@/app/domain/repositories/prompts";
import { prompts } from "@/schema/prompts";

export class PromptsRepositoryImple implements PromptsRepository {
  create(input: PromptType): Promise<void> {
    dbClient
      .insert(prompts)
      .values({
        ...input,
      })
      .execute();
    return Promise.resolve();
  }
}
