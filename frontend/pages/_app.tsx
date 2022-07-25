import "@styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, StylesProvider } from "@chakra-ui/react";
import { Meta } from "@components/Meta";
import { NavBar } from "@components/Navbar";
import { Backdrop } from "@components/Backdrop";

/** Rainbow Kit */
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import merge from "lodash.merge";
import { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Verify User Demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

/* Theming */
const theme = extendTheme({
  styles: {
    global: {
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
      h1: {
        fontSize: "4xl",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "lg",
      },
      h4: {
        fontSize: "md",
      },
    },
  },
});

// rainbow theme
const customTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#7153FF",
  },
} as Theme);

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // prevent hydration UI bug: https://blog.saeloun.com/2021/12/16/hydration.html
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Meta />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={customTheme}>
          <ChakraProvider theme={theme}>
            <NavBar />
            <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
