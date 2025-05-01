import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { getSystemPrompt } from "@/app/domain/entities/prompts";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { TwitterApi } from "twitter-api-v2";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

const provider = new RepositoryProvider();
const slackRepository = provider.slack;
const userRepository = provider.users;
const promptsRepository = provider.prompts;
const llmRepository = provider.llm;
const scheduleRepository = provider.schedules;

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
        try {
          const res = await client.users.getUserOauthAccessToken(
            user.extId,
            "x"
          );
          const token = res.data[0].token;

          if (!user.id) {
            console.error("user.id is undefined");
            return;
          }

          const prompts = await promptsRepository.findByUserId(user.id);

          if (prompts.length > 0) {
            const prompt = prompts[0];
            console.log({ prompt });
            let schedules;
            if (prompt.id) {
              schedules = await scheduleRepository.findByPromptId(prompt.id);
            }

            console.log({ schedules });
            //   const nowUtc = dayjs.utc();
            //   let isScheduled = false;
            //   if (schedules) {
            //     const schedule = schedules.find((schedule) => {
            //       const targetTime = dayjs(schedule.scheduledDate, "HH:mm");
            //       console.log({ targetTime });
            //       console.log({ nowUtc });
            //       return targetTime.hour() === nowUtc.hour();
            //     });

            //     isScheduled = !!schedule;
            //   }

            //   if (!isScheduled) {
            //     await slackRepository.postMessage(
            //       `it is not scheduled: ${JSON.stringify(prompt)}`
            //     );
            //     return;
            //   }

            await slackRepository.postMessage(
              `schedules: 
              ${JSON.stringify(
                schedules?.map((schedule) => schedule.scheduledDate)
              )}
              `
            );

            const systemPrompt = getSystemPrompt(prompt.content);
            const res = await llmRepository.generateContent(systemPrompt);
            const response = await new TwitterApi(token).v2.tweet(res);

            await slackRepository.postMessage(
              `successfully sent message to slack: ${JSON.stringify(response)}`
            );
          }
        } catch (error: any) {
          console.error({ error });
          await slackRepository.postMessage(`error occured: ${error}`);
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
