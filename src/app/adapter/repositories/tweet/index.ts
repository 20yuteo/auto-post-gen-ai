import CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";
import { accessToken, accessTokenSecret, apiKey, apiSecret } from "@/app/const";

export class TweetRepositoryImpl {
  private oauth: OAuth;

  constructor() {
    this.oauth = new OAuth({
      consumer: {
        key: apiKey || "",
        secret: apiSecret || "",
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        const hash = CryptoJS.HmacSHA1(base_string, key);
        return CryptoJS.enc.Base64.stringify(hash);
      },
    });
  }

  postTweet = async (text: string) => {
    const request_data = {
      url: "https://api.twitter.com/2/tweets",
      method: "POST",
    };

    const token = {
      key: accessToken || "",
      secret: accessTokenSecret || "",
    };

    const authorization = this.oauth.authorize(request_data, token);
    const authParams = {
      oauth_consumer_key: authorization.oauth_consumer_key,
      oauth_nonce: authorization.oauth_nonce,
      oauth_signature: authorization.oauth_signature,
      oauth_signature_method: authorization.oauth_signature_method,
      oauth_timestamp: authorization.oauth_timestamp,
      oauth_token: token.key,
      oauth_version: "1.0",
    };

    const authHeaderString = Object.entries(authParams)
      .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
      .join(", ");

    try {
      const response = await fetch(request_data.url, {
        method: request_data.method,
        headers: {
          Authorization: `OAuth ${authHeaderString}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });
    } catch (error) {
      console.error("Tweet投稿に失敗しました", error);
      throw error;
    }
  };
}
