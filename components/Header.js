"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { ThemeModeContext } from "@/providers/AppThemeProvider";
import { ThemeSwitch } from "@/utils/StyledComponents";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const pages = [
  {
    title: "Edit-Home-Page",
    route: "/admin-dashboard/edit-home-page",
  },
  {
    title: "Enquiries",
    route: "/admin-dashboard/enquiries",
  },
];

export default function Header() {
  const router = useRouter();
  const { status } = useSession();
  const themeMode = React.useContext(ThemeModeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#D3D3D3",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box onClick={() => router.push("/")}>
              <Logo />
            </Box>
          </Typography>
          {status === "authenticated" && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none" }}
                        href={page.route}
                      >
                        {page.title}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box onClick={() => router.push("/")}>
              <Logo />
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {status === "authenticated" &&
              pages.map((page) => (
                <Link
                  key={page.route}
                  style={{ textDecoration: "none" }}
                  href={page.route}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ color: "white", display: "block" }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitch
              sx={{ m: 1 }}
              defaultChecked
              onClick={() => {
                themeMode.toggleThemeMode();
              }}
            />
            {status === "authenticated" && (
              <Button
                variant="text"
                onClick={() => signOut()}
                sx={{ color: "white" }}
              >
                Sign-Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
