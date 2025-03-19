import type { LLMRepository } from "@/app/domain/repositories/llm";
import type { SlackRepository } from "@/app/domain/repositories/slack";
import type { TweetRepository } from "@/app/domain/repositories/tweet";
import { LLMRepositoryEmpty } from "@/app/test/domain/repositories/llm";
import { SlackRepositoryEmpty } from "@/app/test/domain/repositories/slack";
import { TweetRepositoryEmpty } from "@/app/test/domain/repositories/tweet";
import { LLMRepositoryImpl } from "./llm";
import { SlackRepositoryImpl } from "./slack";
import { TweetRepositoryImpl } from "./tweet";
import type { IndieHackersRepository } from "@/app/domain/repositories/indieHackers";
import { IndieHackersRepositoryImpl } from "./indieHackers";

export class RepositoryProvider {
  tweet: TweetRepository;
  llm: LLMRepository;
  slack: SlackRepository;
  indieHackers: IndieHackersRepository;

  constructor() {
    if (process.env.ENV === "production") {
      this.tweet = new TweetRepositoryImpl();
      this.llm = new LLMRepositoryImpl();
      this.slack = new SlackRepositoryImpl();
      this.indieHackers = new IndieHackersRepositoryImpl();
    } else {
      this.tweet = new TweetRepositoryEmpty();
      this.llm = new LLMRepositoryEmpty();
      this.slack = new SlackRepositoryEmpty();
      this.indieHackers = new IndieHackersRepositoryImpl();
    }
  }
}
