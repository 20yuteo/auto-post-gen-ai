import type { TweetRepository } from "@/app/domain/repositories/tweet";

export class TweetRepositoryEmpty implements TweetRepository {
  async postTweet(text: string): Promise<void> {
    return Promise.resolve();
  }
}
