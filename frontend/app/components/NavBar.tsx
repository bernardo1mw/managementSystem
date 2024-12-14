"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

const Navbar = () => {
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
