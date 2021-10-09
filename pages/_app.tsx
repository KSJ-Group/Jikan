import "../styles/Global/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StylesProvider } from "../components/StylesContext";
import { SettingsProvider } from "../components/SettingsContext";

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
