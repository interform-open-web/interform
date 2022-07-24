import { Button, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaGithub } from 'react-icons/fa'
import styles from '@styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <VStack gap={2}>
            <h1 className={styles.title}>
              Interform
            </h1>
            <Text fontSize='1.5rem'>
              {`Forms on the dentralized web. Powered by InterPlanetary File System and Filecoin.`}
            </Text>
            <HStack gap={2}>
              <Link href="/builder">
                <Button>Build your own form</Button>
              </Link>
              <Link href="https://www.interform.app/">
                <Button>Landing Page</Button>
              </Link>
            </HStack>
            <p className={styles.description}>
              Check out the source code{' '}
              <a href="https://github.com/interform-open-web/interform" target="_blank" rel="noreferrer">
                <code className={styles.code}>interform</code>
              </a>
            </p>
            <a href="https://github.com/interform-open-web/interform" rel="noreferrer" target="_blank" >
              <IconButton
                aria-label="github icon"
                colorScheme="dark"
                variant="ghost"
                icon={<FaGithub />}
              />
            </a>
          </VStack>
        </main>
      </div>
    </>
  )
}

export default Home
