import { Axios } from "@/lib/axios";

export const fetchAllOrders = async () => {
  try {
    const response = await Axios.get(`/orders/all`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get orders");
  }
};

export const fetchOrder = async (orderId: number) => {
  try {
    const response = await Axios.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get order");
  }
};

export const createOrder = async (input: {
  customerId: string;
  items: {
    productId: string;
    price: string;
    quantity: string;
  }[];
}) => {
  try {
    const response = await Axios.post(`/orders/create`, input);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.errors)
      throw new Error(error.response.data.errors[0]);
    throw new Error("Unable to create order");
  }
};

export const deleteOrder = async (orderId: number | string) => {
  try {
    const response = await Axios.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.errors)
      throw new Error(error.response.data.errors[0]);
    throw new Error("Unable to delete order");
  }
};
