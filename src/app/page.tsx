import {
  Box,
  Flex,
  Button,
  Link,
  ListItem,
  Image,
  List,
} from "@chakra-ui/react";

export default async function Home() {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <Flex direction="column" align="center" justify="center">
        <Image src="/next.svg" alt="Next.js logo" boxSize="180px" />
        <List.Root>
          <ListItem>
            Get started by editing <code>src/app/page.tsx</code>.
          </ListItem>
          <ListItem>Save and see your changes instantly.</ListItem>
        </List.Root>
        <Flex gap={4} mt={6}>
          <Button as={Link} colorScheme="blue" rel="noopener noreferrer">
            Deploy now
          </Button>
          <Button as={Link} rel="noopener noreferrer" variant="outline">
            Read our docs
          </Button>
        </Flex>
      </Flex>
      <Flex as="footer" mt={10} justify="space-around">
        <Link
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </Link>
        <Link
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </Link>
        <Link
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </Link>
      </Flex>
    </Box>
  );
}
