export interface SlackRepository {
	postMessage: (text: string) => Promise<void>;
}
