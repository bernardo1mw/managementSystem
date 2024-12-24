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
import { useCustomersDetailsHook } from "@/app/hooks/useCustomersDetails";
import { useParams } from "next/navigation";

const EditCustomerPage = () => {
  // const {
  //   businessName,
  //   setBusinessName,
  //   document,
  //   email,
  //   setEmail,
  //   handleUpdateCustomer,
  //   isLoading,
  //   formatCNPJ,
  //   handleCNPJ,
  // } = useCustomersHook();  
  
  const { id } = useParams<{ id: string }>();
  const {setCustomer, formatCNPJ, handleCNPJ, handleUpdateCustomer, customer, isLoading} = useCustomersDetailsHook(id);


  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Editar Cliente
      </Typography>
      <form onSubmit={handleUpdateCustomer}>
        <TextField
          label="Razão Social"
          variant="outlined"
          fullWidth
          value={customer.businessName}
          onChange={(e) => setCustomer({businessName: e.target.value, document: customer.document, email: customer.email})}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="CNPJ"
          variant="outlined"
          fullWidth
          value={formatCNPJ(customer.document)}
          onChange={handleCNPJ}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          value={customer.email}
          onChange={(e) => {
            console.log("TTT, ", e.target.value)
            setCustomer({email: e.target.value, document: customer.document, businessName: customer.businessName})}}
          sx={{ marginBottom: "1rem" }}
          required
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Salvar"}
        </Button>
        <Link href="/customers">
          <Button
            variant="text"
            color="error"
            type="submit"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </Link>
      </form>
    </Box>
  );
};

export default EditCustomerPage;
