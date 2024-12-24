"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <AppBar position="static" sx={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textTransform: "uppercase" }}
        >
          Excellent Sistemas
        </Typography>
        <Box>
          <Link href="/customers" passHref>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Clientes
            </Button>
          </Link>
          <Link href="/products" passHref>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Produtos
            </Button>
          </Link>
          <Link href="/orders" passHref>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Pedidos
            </Button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/signin" passHref>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" passHref>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Registrar
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**
 * 
 * 
 * {localStorage.getItem("email") ? (
            <>
              <Typography>
                {" "}
                Bem vindo {localStorage.getItem("email")}
              </Typography>
              <Link href="/signin" passHref>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none" }}
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" passHref>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Registrar
                </Button>
              </Link>
            </>
          )}
 */
