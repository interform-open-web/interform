import {
  Box,
  Button,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { FaGithub } from "react-icons/fa";
import styles from "@styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";

const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          {!address ? (
            <VStack gap={2}>
              <h1 className={styles.title}>Interform</h1>
              <Text fontSize="1.5rem">
                {`Forms on the decentralized web. Powered by IPFS and Filecoin.`}
              </Text>
              <Spacer h="10px"></Spacer>
              <ConnectButton />
              <Spacer h="10px"></Spacer>
              <a
                href="https://github.com/interform-open-web/interform"
                rel="noreferrer"
                target="_blank"
              >
                <IconButton
                  aria-label="github icon"
                  colorScheme="dark"
                  variant="ghost"
                  icon={<FaGithub className={styles.githubButton} />}
                />
              </a>
            </VStack>
          ) : (
            <HStack gap={2} className={styles.selectionContainer}>
              <VStack className={styles.containerLeft}>
                <Text fontSize="1.5rem" w="400px">
                  {`Already have an existing form to edit or view responses?`}
                </Text>
                <Spacer h="10px"></Spacer>
                <Link href={`/dashboard`}>
                  <Button className={styles.dashboardButton}>
                    Go to Dashboard
                  </Button>
                </Link>
              </VStack>
              <Box className={styles.divider}></Box>
              <VStack className={styles.containerRight}>
                <Text fontSize="1.5rem" w="400px">
                  {`Want to build a new form on the decentralized web?`}
                </Text>
                <Spacer h="10px"></Spacer>
                <Link href={`/build`}>
                  <Button className={styles.buildButton}>Create Form</Button>
                </Link>
              </VStack>
            </HStack>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
