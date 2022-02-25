import React from "react";
import { Skeleton, Stack } from "@mui/material";
import { useSession } from "next-auth/client";
import { AccessDenied } from "@components/AccessDenied";

interface Props {
  Component: any;
  pageProps: any;
}

const Layout = ({ Component, pageProps }: Props) => {
  const [session, loading] = useSession();

  if (loading)
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    );

  if (session == null) {
    return <AccessDenied />;
  }

  return (
    <>
      <header>header</header>
      <Component {...pageProps} />
      <footer>Soy un footer</footer>
    </>
  );
};

export default Layout;
