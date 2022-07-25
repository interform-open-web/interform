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

export const FormNavBar = ({ setIsSubmitted }: any) => {
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
      </HStack>
      <Text className={styles.title}>InterForm</Text>
      <HStack>
        <Spacer w="10px"></Spacer>
        <ConnectButton />
      </HStack>
    </HStack>
    // </Flex>
  );
};
