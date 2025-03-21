import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { RiTwitterXFill } from "react-icons/ri";
import { PromptDialog } from "./promptDialog/DynamicPromptDialog";

export const Nav = () => {
  const onClick = () => {
    console.log("test");
  };
  return (
    <Box as="nav" bg={"gray.900"} px={6} py={4} boxShadow="md" minW="15vw">
      <Flex
        direction="column"
        gap="4"
        alignItems="center"
        maxW="1200px"
        mx="auto"
      >
        <Heading fontSize="2xl" fontWeight="bold">
          <Flex direction="row" alignItems="center">
            <RiTwitterXFill />
            AutoPost.AI
          </Flex>
        </Heading>
        <Button variant="outline" onClick={onClick}>
          Login
        </Button>
        <PromptDialog />
      </Flex>
    </Box>
  );
};
