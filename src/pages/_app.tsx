import { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import Layout from "../Layout/index";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <AuthProvider session={session}>
      <Layout Component={Component} pageProps={pageProps} />
      {/* <Component {...pageProps} /> */}
    </AuthProvider>
  );
};

export default MyApp;
