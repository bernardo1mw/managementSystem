import { useEffect, useState } from "react";
import { createCustomer, fetchAllCustomers, getCompanyData, updateCustomer } from "../services/api/customer";
import { useNotification } from "../context/NotificationContext";

export function useCustomersHook() {
  const [customers, setCustomers] = useState([]);
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");

  const getCustomers = async () => {
    const customers = await fetchAllCustomers();
    setCustomers(customers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const createNewCustomer = async (input: {
    businessName: string;
    document: string;
    email: string;
  }) => {
    try {
      setIsLoading(true);
      await createCustomer(input);
      await getCustomers();
      showNotification("Cliente cadastrado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao cadastrar cliente`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleUpdate = async (e: React.FormEvent) => {
  const handleUpdateCustomer = async (
  //   input: {
  //   businessName: string;
  //   document: string;
  //   email: string;
  // }
  e: React.FormEvent) => {
    
    
    try {
      e.preventDefault();
      setIsLoading(true);
      await updateCustomer({businessName,
        document,
        email,});
      await getCustomers();
      showNotification("Cliente cadastrado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao cadastrar cliente`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .slice(0, 14) // Limita a 14 caracteres
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{2})$/, "$1-$2");
  };

  const handleCNPJ = async (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 14); // Apenas números
    setDocument(numericValue);
    if(numericValue.length == 14) {
    try {
      const company = await getCompanyData(numericValue);
      setBusinessName(company.razao_social)
      setEmail(company.email ?? "")
    } catch (err) {
      showNotification(`Falha ao buscar dados da empresa`, "error");
    }}
    
  };

  return {
    customers,
    getCustomers,
    createNewCustomer,
    formatCNPJ,
    isLoading,
    handleCNPJ,
    businessName,
    setBusinessName,
    document,
    setDocument,
    email,
    setEmail,
    handleUpdateCustomer
  };
}
