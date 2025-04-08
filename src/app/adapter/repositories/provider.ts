import type { LLMRepository } from "@/app/domain/repositories/llm";
import type { SlackRepository } from "@/app/domain/repositories/slack";
import type { TweetRepository } from "@/app/domain/repositories/tweet";
import { LLMRepositoryImpl } from "./llm";
import { SlackRepositoryImpl } from "./slack";
import { TweetRepositoryImpl } from "./tweet";
import type { IndieHackersRepository } from "@/app/domain/repositories/indieHackers";
import { IndieHackersRepositoryImpl } from "./indieHackers";
import { PromptsRepository } from "@/app/domain/repositories/prompts";
import { PromptsRepositoryImple } from "./prompts";
import { UserRepository } from "@/app/domain/repositories/users";
import { userRepositoryImple } from "./users";

export class RepositoryProvider {
  tweet: TweetRepository;
  llm: LLMRepository;
  slack: SlackRepository;
  indieHackers: IndieHackersRepository;
  prompts: PromptsRepository;
  users: UserRepository;

  constructor() {
    // if (process.env.ENV === "production") {
    this.tweet = new TweetRepositoryImpl();
    this.llm = new LLMRepositoryImpl();
    this.slack = new SlackRepositoryImpl();
    this.indieHackers = new IndieHackersRepositoryImpl();
    this.users = new userRepositoryImple();
    // } else {
    //   this.tweet = new TweetRepositoryEmpty();
    //   this.llm = new LLMRepositoryEmpty();
    //   this.slack = new SlackRepositoryEmpty();
    //   this.indieHackers = new IndieHackersRepositoryImpl();
    //   this.users = new userRepositoryImple();
    // }

    this.prompts = new PromptsRepositoryImple();
  }
}
