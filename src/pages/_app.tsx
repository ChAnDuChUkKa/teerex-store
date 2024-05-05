import Header from "@/components/header";
import { AppProvider } from "@/context/provider";
import "@/styles/globals.css";
import styles from "@/styles/Home.module.css";
import type { AppProps } from "next/app";
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ReactNotifications />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.componentsContainer}>
          <Component {...pageProps} />
        </div>
      </div>
    </AppProvider>
  );
}
