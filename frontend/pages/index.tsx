import { IconButton, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FaGithub } from 'react-icons/fa'
import styles from '@styles/Home.module.css'

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
            <p className={styles.description}>
              Check out the source code{' '}
              <a href="https://github.com/straightupjac/interform" target="_blank" rel="noreferrer">
                <code className={styles.code}>interform</code>
              </a>
            </p>
            <a href="https://github.com/straightupjac/interform" rel="noreferrer" target="_blank" >
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
