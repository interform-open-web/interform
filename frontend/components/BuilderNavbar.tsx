import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
  Switch,
  Spinner,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const BuilderNavBar = ({ setIsSubmitted }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handlePublish() {
    setIsLoading(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  }

  console.log("isLoading: ", isLoading);
  return (
    <HStack className={styles.navbar}>
      <HStack>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="interform Logo"
            w="58px"
            h="58px"
            cursor="pointer"
          />
        </Link>
        <Spacer w="10px"></Spacer>
        <Box className={styles.backButtonBox}>
          <IconButton
            aria-label="back button"
            variant="ChevronLeftIcon"
            opacity=".9"
            w="20px"
            icon={<ChevronLeftIcon w={6} h={6} />}
          />
        </Box>
        <Spacer w="10px"></Spacer>
        <HStack>
          <Text>Collect User Addresses</Text>
          <Switch size="lg" colorScheme="purple" />
        </HStack>
      </HStack>
      <Text className={styles.title}>InterForm</Text>
      <HStack>
        <Button className={styles.publishButton} onClick={handlePublish}>
          {isLoading ? (
            <Box width="100%" display="flex" justifyContent="center">
              <Spinner color="white" />
            </Box>
          ) : (
            "Publish"
          )}
        </Button>
        <Spacer w="10px"></Spacer>
        <ConnectButton />
      </HStack>
    </HStack>
    // </Flex>
  );
};
