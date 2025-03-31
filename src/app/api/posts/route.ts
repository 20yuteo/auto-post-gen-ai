import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { TwitterApi } from "twitter-api-v2";

const client = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
  const request = await req.json();
  const userId = request.userId;

  const res = await client.users.getUserOauthAccessToken(userId, "x");
  const token = res.data[0].token;

  await new TwitterApi(token).v2.tweet("Hello from Next.js!");
  return NextResponse.json({ ok: true });
}
