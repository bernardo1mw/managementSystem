"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";

const SignUp = () => {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignup,
  } = useUser();

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Criar Conta
      </Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Registrar
        </Button>
      </form>

      <div className="my-1">
        <Link href="/signin">
          <Button
            size="small"
            variant="text"
            color="primary"
            fullWidth
            type="submit"
          >
            Entrar
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default SignUp;
