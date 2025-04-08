import { RepositoryProvider } from "@/app/adapter/repositories/provider";

const provider = new RepositoryProvider();
const slackRepository = provider.slack;
const userRepository = provider.users;

export const handler = async (event: any) => {
  console.log("try to send message to slack");
  const users = await userRepository.findAll();
  console.log(`users.length: ${users.length}`);
  users.map((u) => console.log({ u }));
  await slackRepository.postMessage("Hello, world from TypeScript!");
  await slackRepository.postMessage(`users.length: ${users.length}`);
  console.log("successfully sent message to slack");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world from TypeScript!" }),
  };
};
