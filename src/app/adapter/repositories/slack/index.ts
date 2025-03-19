import { WebClient } from "@slack/web-api";
import type { SlackRepository } from "@/app/domain/repositories/slack";

export class SlackRepositoryImpl implements SlackRepository {
  async postMessage(text: string): Promise<void> {
    const token = process.env.SLACK_BOT_USER_AUTH_TOKEN;
    const channel = "#notify_from_util_tools";

    const client = new WebClient(token);
    await client.chat.postMessage({ channel, text });
  }
}
