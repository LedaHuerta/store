// import { useTranslation } from "next-i18next";

import { Typography, Button } from "@mui/material";

export function AccessDenied() {
  //   const { t } = useTranslation("page-errors");

  return (
    <div>
      <Typography variant="h2">😟 Ups!</Typography>
      <Typography variant="body1">
        Al parecer no tienes acceso a esta página
      </Typography>
      <Button
        color="primary"
        variant="contained"
        href="/api/auth/signin"
        title="SignIn"
      >
        SignIn
      </Button>
    </div>
  );
}
