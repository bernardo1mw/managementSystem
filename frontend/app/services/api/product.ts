import { Axios } from "@/lib/axios";
import axios from "axios";

export const fetchAllProducts = async () => {
  try {
    const response = await Axios.get(`/products/all`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get products");
  }
};

export const fetchProduct = async (productId: string) => {
  try {
    const response = await Axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get products");
  }
};

export const createProduct = async (input: FormData) => {
  try {
    const response = await Axios.post(`/products/create`, input, {
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.errors)
      throw new Error(error.response.data.errors[0]);
    throw new Error("Unable to create product");
  }
};

export const deleteProduct = async (productId: number | string) => {
  try {
    const response = await Axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.errors)
      throw new Error(error.response.data.errors[0]);
    throw new Error("Unable to delete product");
  }
};

export const updateProduct = async (
  productId: string,
  body: Partial<{
    description: string;
    price: number;
    stock: number;
    images: string[];
  }>
) => {
  try {
    const response = await Axios.put(`/products/${productId}`, body);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.errors)
      throw new Error(error.response.data.errors[0]);
    throw new Error("Unable to update product");
  }
};
