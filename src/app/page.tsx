import Image from "next/image";
import styles from "./page.module.css";
import { RepositoryProvider } from "@/app/adapter/repositories/provider";

export default async function Home() {
  const slackRepository = new RepositoryProvider().slack;
  try {
    const indieHackersRepository = new RepositoryProvider().indieHackers;
    const llmRepository = new RepositoryProvider().llm;
    const tweetRepository = new RepositoryProvider().tweet;

    const res = await indieHackersRepository.getPosts();

    if (!res) {
      throw new Error("Failed to fetch posts");
    }

    const prompt = `
      あなたは、xのポストを投稿するプロのSNSマーケターです。
    
      1. xのポストとして投稿するために、タイトルもしくはtextを日本語に翻訳してください
       - title: ${res?.title}
       - text: ${res?.text}
      2. ポストの中にハッシュダグを入れて下さい。
      3. ポストの中にURLが存在すれば以下のURLを入れて下さい。
        - ${res?.url}
      6. 出力形式はplane textにしてください。
      7. ポストは140文字以内です。
      `;

    const content = await llmRepository.generateContent(prompt);

    await tweetRepository.postTweet(content);

    await slackRepository.postMessage(`Success: ${content}`);

    console.log("Success");
  } catch (error) {
    await slackRepository.postMessage(`Error: ${error}`);

    console.log("Error");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
