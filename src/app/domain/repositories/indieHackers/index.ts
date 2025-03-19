import type { HackerNewsItem } from "@/app/adapter/repositories/indieHackers";

export interface IndieHackersRepository {
  getPosts: () => Promise<HackerNewsItem | undefined>;
}
