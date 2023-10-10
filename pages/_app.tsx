import { Exo } from "next/font/google";
import "../styles/globals.css";
import type { AppProps } from "next/app";

// Exo is a variable font. no need to import different font weights
const exo = Exo({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={exo.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
