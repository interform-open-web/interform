import { Button, Flex } from "@chakra-ui/react"
import Link from "next/link"

export const NavBar = () => {
  return (<Flex
    as="header"
    position="fixed"
    alignContent="space-evenly"
    w="100%"
    p={2}
    px={4}
    backdropFilter="saturate(150%) blur(20px)"
    zIndex={100}
  >
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
  </Flex>)
}