import "../styles/Global/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StylesProvider } from "../components/StylesContext";
import { SettingsProvider } from "../components/SettingsContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider>
      <Head>
        <meta
          content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"
          name="viewport"
        />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <SettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </StylesProvider>
  );
}

export default MyApp;
