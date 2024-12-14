"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useProductDetailsHook } from "@/app/hooks/useProductDetails";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  // const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { isLoading, handleDeleteProduct, isModalOpen, form, handleChange, handlePriceChange, handleUpdateProduct, handleModal } =
    useProductDetailsHook(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProduct();
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Descrição"
          name="description"
          fullWidth
          required
          value={form.description}
          onChange={handleChange}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Preço"
          name="price"
          fullWidth
          required
          value={form.price}
          onChange={(e) => {
            handlePriceChange(e);
          }}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Estoque"
          name="stock"
          type="number"
          fullWidth
          required
          value={form.stock}
          onChange={handleChange}
          sx={{ marginBottom: "1rem" }}
        />
        <Button type="submit" variant="contained" sx={{ marginRight: "0.5rem" }}>
          Salvar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleModal}
        >
          Deletar
        </Button>
      </form>
      <Dialog open={isModalOpen} onClose={handleModal}>
        <DialogTitle>Você tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você quer deletar o produto?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleModal}>Cancelar</Button>
            <Button
              color="error"
              onClick={handleDeleteProduct}
              autoFocus
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Deletar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditProductPage;
