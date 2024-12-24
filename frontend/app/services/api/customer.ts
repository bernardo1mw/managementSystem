import { Axios } from "@/lib/axios";
import axios from "axios";

export const fetchAllCustomers = async () => {
  try {
    const response = await Axios.get(`/customers/all`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get customers");
  }
};

export const fetchCustomer = async (id: string) => {
  try {
    const response = await Axios.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get customer");
  }
};

export const createCustomer = async (input: {
  businessName: string,
  document: string
  email: string,
}) => {
  try {
    const response = await Axios.post(`/customers/register`, input);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if(error.response.data.errors) throw new Error(error.response.data.errors[0])
    throw new Error("Unable to create customer");
  }
};

export const updateCustomer = async (input: Partial<{
  businessName: string,
  document: string
  email: string,
}>) => {
  try {
    const response = await Axios.post(`/customers/update`, input);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if(error.response.data.errors) throw new Error(error.response.data.errors[0])
    throw new Error("Unable to update customer");
  }
};

export const getCompanyData = async (document: string) => {
  try {
    const response = await axios.get(`https://publica.cnpj.ws/cnpj/${document}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if(error.response.data.errors) throw new Error(error.response.data.errors[0])
    throw new Error("Unable to get company data");
  }
}
