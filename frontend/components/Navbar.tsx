import { Box, HStack, IconButton, Image, Spacer, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const NavBar = () => {
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
      </HStack>
      <Text className={styles.title}>InterForm</Text>
      <HStack>
        <Spacer w="10px"></Spacer>
        <ConnectButton />
      </HStack>
    </HStack>
  );
};
