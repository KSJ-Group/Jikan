import "../src/styles/Global/global.css";
import type { AppProps } from "next/app";
import Layout from "../src/Components/Layout";
import { StylesProvider } from "../src/contexts/StylesContext";
import { SettingsProvider } from "../src/contexts/SettingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider>
      <SettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </StylesProvider>
  );
}

export default MyApp;
