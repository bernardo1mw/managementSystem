'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useCustomersHook } from '../hooks/useCustomers';
import dayjs from 'dayjs';

const CustomersPage = () => {
  // const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    customers,
    formatCNPJ,
  } = useCustomersHook()
  


  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>
      <Button variant="contained" color="primary" href="/customers/new">
        Cadastrar Cliente
      </Button>
      {loading && <CircularProgress style={{ margin: '1rem 0' }} />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Razão Social</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Data de criação</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.businessName}</TableCell>
                  <TableCell>{formatCNPJ(customer.document)}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{dayjs(customer.createdAt).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>
                    <Link href={`/customers/${customer.id}`} passHref>
                      <Button variant="outlined" sx={{ marginY: "0.5rem" ,marginX: "0.5rem" }}>
                        Editar
                      </Button>
                    </Link>
                    {/* <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteButton(product)}
                    >
                      Deletar
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CustomersPage;
