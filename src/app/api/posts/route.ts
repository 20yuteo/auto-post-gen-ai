import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { TwitterApi } from "twitter-api-v2";
import { RepositoryProvider } from "@/app/adapter/repositories/provider";

const client = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
  const request = await req.json();
  const userId = request.userId;
  const userRepository = new RepositoryProvider().users;
  const user = await userRepository.findByExtId(userId);
  const res = await client.users.getUserOauthAccessToken(userId, "x");
  const token = res.data[0].token;

  if (user) {
    await new TwitterApi(token).v2.tweet("Hello from Next.js!");
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, message: "User not found" });
}
