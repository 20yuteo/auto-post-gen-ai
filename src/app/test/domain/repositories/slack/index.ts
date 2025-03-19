import type { SlackRepository } from "@/app/domain/repositories/slack";

export class SlackRepositoryEmpty implements SlackRepository {
  async postMessage(text: string): Promise<void> {
    return Promise.resolve();
  }
}
