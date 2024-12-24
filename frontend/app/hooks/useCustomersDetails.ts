import { useEffect, useState } from "react";
import {
  createCustomer,
  fetchAllCustomers,
  fetchCustomer,
  getCompanyData,
  updateCustomer,
} from "../services/api/customer";
import { useNotification } from "../context/NotificationContext";

export function useCustomersDetailsHook(id: string) {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<{
    businessName: string;
    document: string;
    email: string;
  }>({
    businessName: '',
    document: '',
    email: '',
  });

  const getCustomer = async () => {
    const customer = await fetchCustomer(id);
    setCustomer({
      businessName: customer.businessName || '',
      document: customer.document || '',
      email: customer.email || '',
    });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const handleUpdateCustomer = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await updateCustomer(customer);
      showNotification("Cliente atualizado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao atualizar dados do cliente`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCNPJ = (value: string) => {
    if (!value) return "";
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
    setCustomer({document: numericValue, businessName: customer.businessName, email: customer.email});
    if (numericValue.length == 14) {
      try {
        const company = await getCompanyData(numericValue);
        setCustomer({document: numericValue, businessName: company.razao_social, email: company.email ?? ""});
      } catch (err) {
        showNotification(`Falha ao buscar dados da empresa`, "error");
      }
    }
  };

  // const setSelectedCustomer = (input: {
  //   businessName: string;
  //   document: string;
  //   email: string;
  // }) => {
  //   setBusinessName(input.businessName);
  //   setDocument(input.document);
  //   setEmail(input.email);
  // };

  return {
    customer,
    formatCNPJ,
    isLoading,
    handleCNPJ,
    handleUpdateCustomer,
    setCustomer
    // document,
    // businessName,
    // setBusinessName,
    // setDocument,
    // email,
    // setEmail,
    // setSelectedCustomer,
  };
}
