"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import { useProductsHook } from "@/app/hooks/useProducts";

const CreateProductPage = () => {
  const {images, handleSubmit, handlePriceChange, handleChange, newProductForm, handleImageChange} = useProductsHook();

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Criar Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Descrição"
          name="description"
          fullWidth
          required
          value={newProductForm.description}
          onChange={handleChange}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Preço"
          name="price"
          fullWidth
          required
          value={newProductForm.price}
          onChange={handlePriceChange}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Estoque"
          name="stock"
          type="number"
          fullWidth
          required
          value={newProductForm.stock}
          onChange={handleChange}
          sx={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" component="label">
        Selecionar Imagens
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>
      <Typography>
        {images.length} imagem(ns) selecionada(s)
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Button type="submit" variant="contained">
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductPage;
