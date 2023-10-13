import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { Exo } from "next/font/google";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ParentContainer from "@/containers/ParentContainer";

// Exo is a variable font. no need to import different font weights
const exo = Exo({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <main className={exo.className}>
        <ParentContainer>
          <Component {...pageProps} />
        </ParentContainer>
      </main>
    </ApolloProvider>
  );
}

export default MyApp;
