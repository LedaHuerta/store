import React from "react";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const brand = "<devLedaHuerta>";
const appBarLabel = (label: string) => {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Spk Store
        </Typography>
      </IconButton>

      <Typography
        variant="subtitle2"
        noWrap
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {label}
      </Typography>
      {/* <CopyrightIcon fontSize="small" />
      <Typography variant="body1" noWrap component="div" sx={{ flexGrow: 1 }}>
        2022
      </Typography> */}
    </Toolbar>
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Footer = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel(`Made with lots of 💜💜 and ☕☕☕☕ by ${brand}`)}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};

export default Footer;
