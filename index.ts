import { RepositoryProvider } from "@/app/adapter/repositories/provider";

export const handler = async (event: any) => {
  const slackRepository = new RepositoryProvider().slack;
  console.log("try to send message to slack");
  await slackRepository.postMessage("Hello, world from TypeScript!");
  console.log("successfully sent message to slack");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world from TypeScript!" }),
  };
};
