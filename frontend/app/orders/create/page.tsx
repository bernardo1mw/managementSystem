"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useOrdersHook } from "@/app/hooks/useOrders";
import { useCustomersHook } from "@/app/hooks/useCustomers";
import { useProductsHook } from "@/app/hooks/useProducts";
import AddIcon from "@mui/icons-material/Add";

const CreateOrderPage = () => {
  const {
    orderProducts,
    handleAddProduct,
    quantity,
    setQuantity,
    handleCreateOrder,
    selectedCustomer,
    setSelectedCustomer,
  } = useOrdersHook();
  const { customers, formatCNPJ } = useCustomersHook();
  const { products, selectedProduct, setSelectedProduct } = useProductsHook();

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Criar Pedido
      </Typography>
      <form onSubmit={handleCreateOrder}>
        <TextField
          sx={{ marginBottom: "2rem" }}
          select
          label="Selecione um Cliente"
          value={selectedCustomer || ""}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          fullWidth
        >
          {customers.map((customer: any) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.businessName} -- {formatCNPJ(customer.document)}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" gap={2} marginBottom="1rem">
          <TextField
            select
            label="Selecione um Produto"
            value={selectedProduct || ""}
            onChange={(e) => setSelectedProduct(e.target.value)}
            fullWidth
          >
            {products.map((product: any) => (
              <MenuItem key={product.id} value={product}>
                {product.description} - R${product.price}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
            sx={{ width: "100px" }}
          />
          <Button
            variant="contained"
            onClick={() => handleAddProduct(selectedProduct)}
          >
            <AddIcon></AddIcon>
          </Button>
        </Box>

        {/* Order Products Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Preço (R$)</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Total (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderProducts.map((op: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{op.product.description}</TableCell>
                <TableCell>{op.product.price}</TableCell>
                <TableCell>{op.quantity}</TableCell>
                <TableCell>
                  {(op.quantity * op.product.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orderProducts.length > 0 && (
          <div className="my-4">
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "0.5rem" }}
              onClick={handleCreateOrder}
            >
              Criar
            </Button>
            <Button variant="contained" color="error" onClick={() => {}}>
              Cancelar
            </Button>
          </div>
        )}
      </form>
    </Box>
  );
};

export default CreateOrderPage;
