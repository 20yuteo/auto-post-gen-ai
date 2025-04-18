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
          const res = await llmRepository.generateContent(prompt.content);
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
