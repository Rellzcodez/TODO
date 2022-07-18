import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainContextProvider } from "../context/MainContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
