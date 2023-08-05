import "../src/styles/Global/global.css";
import type { AppProps } from "next/app";
import Layout from "../src/Components/Layout";
import { StylesProvider } from "../src/contexts/StylesContext";
import { SettingsProvider } from "../src/contexts/SettingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <StylesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StylesProvider>
    </SettingsProvider>
  );
}

export default MyApp;
