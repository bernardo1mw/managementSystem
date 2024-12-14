"use client";

import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCustomersHook } from "@/app/hooks/useCustomers";
import Link from "next/link";

const NewCustomerPage = () => {
  const {
    businessName,
    setBusinessName,
    document,
    setDocument,
    email,
    setEmail,
    customers,
    getCustomers,
    createNewCustomer,
    isLoading,
    formatCNPJ,
    handleCNPJ,
  } = useCustomersHook();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewCustomer({
      businessName,
      document,
      email,
    });
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Cadastrar Cliente
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Razão Social"
          variant="outlined"
          fullWidth
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="CNPJ"
          variant="outlined"
          fullWidth
          value={formatCNPJ(document)}
          onChange={handleCNPJ}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Cadastrar"}
        </Button>
        <Link href="/customers">
          <Button
            variant="text"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Voltar para a Lista de clientes
          </Button>
        </Link>
      </form>
    </Box>
  );
};

export default NewCustomerPage;
