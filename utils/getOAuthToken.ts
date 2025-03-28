import { clerkClient } from "@clerk/nextjs/server";

export async function getOAuthToken(userId: string) {
  if (!userId) return null;

  try {
    const client = await clerkClient();
    const res = await client.users.getUserOauthAccessToken(userId, "x");

    return res;
  } catch (error) {
    console.error("Error fetching OAuth token:", error);
    return null;
  }
}
