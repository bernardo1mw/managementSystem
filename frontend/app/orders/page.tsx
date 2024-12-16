"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useOrdersHook } from "../hooks/useOrders";
import dayjs from "dayjs";
import { Visibility } from "@mui/icons-material";

const OrdersList = () => {
  const {
    selectedOrder,
    isLoading,
    isDeleteModalOpen,
    handleDeleteModal,
    orders,
    handleDelete,
    handleView,
    isOrderModalOpen,
    handleOrderModal,
  } = useOrdersHook();

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Products
      </Typography>
      <Link href="/orders/create" passHref>
        <Button variant="contained" sx={{ marginBottom: "1rem" }}>
          Criar Pedido
        </Button>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                {dayjs(order.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                <Button
                  sx={{ marginRight: "0.5rem" }}
                  variant="text"
                  color="primary"
                  onClick={() => handleView(order.id)}
                  
                >
                  <Visibility />
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteModal(order)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteModal}>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>Você quer deletar o pedido?</DialogContentText>
          <DialogActions>
            <Button onClick={handleDeleteModal}>Cancelar</Button>
            <Button
              color="error"
              onClick={handleDelete}
              autoFocus
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Deletar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={isOrderModalOpen} onClose={handleOrderModal}>
        <DialogTitle>
          <span className="font-semibold text-2xl">Detalhes do Pedido</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
              <Typography>
                ID do Cliente: {selectedOrder?.customerId}
              </Typography>
              <Typography>ID do Pedido: {selectedOrder?.id}</Typography>
              <Divider sx={{ marginY: 2 }} />

              {/* Order Products */}
              <Typography>
                <span className="font-semibold text-2xl">Produtos</span>
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Preço Unitário</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder?.items?.map((product: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>R$ {product.unitPrice}</TableCell>
                      <TableCell>
                        R$ {(product.quantity * product.unitPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ marginY: 2 }} />

              {/* Order Summary */}
              <Typography>
                <span className="font-semibold text-xl">Resumo do Pedido</span>
              </Typography>
              <Typography>Total: R$ {selectedOrder?.total}</Typography>
              <Typography>
                Data do Pedido:{" "}
                {dayjs(selectedOrder?.order_date).format("HH:mm DD/MM/YYYY")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrdersList;
