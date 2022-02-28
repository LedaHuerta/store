import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CardProduct from "../components/CardProduct";
import "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Home = () => {
  const [session, loading] = useSession();
  const pages = ["products", "pricing", "blog", "premium"];
  const settings = ["Profile", "Account"];
  const avatar: string = session ? session?.user?.image : "";

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const loginLogout = () => {
    if (loading) {
      return null;
    }

    if (session === null) {
      return (
        <MenuItem key="signIn" onClick={() => signIn()}>
          <Typography textAlign="center">signIn</Typography>
        </MenuItem>
      );
    }
    return (
      <MenuItem key="signOut" onClick={() => signOut()}>
        <Typography textAlign="center">signOut</Typography>
      </MenuItem>
    );
  };

  const username = () => {
    if (loading) {
      return null;
    }

    if (session === null) {
      return null;
    }
    return <span className="user-name">{session?.user?.name} </span>;
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary" enableColorOnDark></AppBar>
      </ThemeProvider>
      <div className="main-container">
        <CardProduct />
      </div>
    </div>
  );
};
export default Home;
