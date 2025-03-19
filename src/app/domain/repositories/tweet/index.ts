export interface TweetRepository {
	postTweet: (text: string) => Promise<void>;
}
