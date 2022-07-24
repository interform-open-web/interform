import { Button, Flex, HStack } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export const NavBar = () => {
  return (<Flex
    as="header"
    position="fixed"
    justifyContent="space-between"
    w="100%"
    p={2}
    px={4}
    backdropFilter="saturate(150%) blur(20px)"
    zIndex={100}
  >
    <HStack gap={2}>
      <Link href='/'>
        <Button size="lg" variant="ghost" color="teal.800" >
          Home
        </Button>
      </Link>
      <Link href='/builder'>
        <Button size="lg" variant="ghost" color="teal.800" >
          Build form
        </Button>
      </Link>
    </HStack>
    <ConnectButton />
  </Flex>)
}