import { dbClient } from "@/app/configs";
import {
  PromptsRepository,
  PromptInput,
} from "@/app/domain/repositories/prompts";
import { prompts } from "@/schema/prompts";

export class PromptsRepositoryImple implements PromptsRepository {
  create(input: PromptInput): Promise<void> {
    dbClient
      .insert(prompts)
      .values({
        ...input,
      })
      .execute();
    return Promise.resolve();
  }

  async findAll(): Promise<PromptInput[]> {
    const res = await dbClient.select().from(prompts).execute();
    return res.map((item) => ({ ...item, userId: item.userId || "" }));
  }
}
