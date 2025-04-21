import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { TwitterApi } from "twitter-api-v2";

const provider = new RepositoryProvider();
const slackRepository = provider.slack;
const userRepository = provider.users;
const promptsRepository = provider.prompts;
const llmRepository = provider.llm;

export const handler = async (event: any) => {
  try {
    console.log("try to send message to slack");
    const users = await userRepository.findAll();

    console.log({ users });
    const client = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    await Promise.all(
      users.map(async (user) => {
        console.log({ user });
        const res = await client.users.getUserOauthAccessToken(user.extId, "x");
        console.log({ res });
        const token = res.data[0].token;
        console.log({ token });

        if (!user.id) {
          console.error("user.id is undefined");
          return;
        }

        console.log("user.id is defined", user.id);

        const prompts = await promptsRepository.findByUserId(user.id);

        console.log({ prompts });

        if (prompts.length > 0) {
          const prompt = prompts[0];
          const systemPrompt = `
            You are a social media content planner who shares helpful information for engineers on X (formerly Twitter).
            Your goal is ${prompt}.
            Please follow these guidelines:
            1. Keep posts short and concise (mind X's character limit).
            2. Use emojis to make the post visually appealing and approachable.
            3. Add relevant hashtags to increase visibility.
            4. Focus on introducing specific tools or techniques rather than abstract concepts.
            5. Write in English for an English-speaking engineering audience.
            6. Output only one post at a time, in plain text (no Markdown formatting).
            7. Do not include replies—only output the post itself.
            8. Always aim to communicate useful, specific information as briefly and clearly as possible.
          `;
          const res = await llmRepository.generateContent(systemPrompt);
          const response = await new TwitterApi(token).v2.tweet(res);

          await slackRepository.postMessage(
            `successfully sent message to slack: ${JSON.stringify(response)}`
          );
        }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello, world from TypeScript!" }),
    };
  } catch (e) {
    console.error({ e });
    await slackRepository.postMessage(`error occured: ${e}`);
  }
};
