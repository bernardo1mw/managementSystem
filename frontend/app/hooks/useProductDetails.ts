import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
  updateProduct,
  deleteProduct,
  fetchProduct,
} from "../services/api/product";
import { useRouter } from "next/navigation";

export function useProductDetailsHook(id: string) {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const getProduct = async () => {
    const product = await fetchProduct(id);
    setForm({
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images,
    });
    setProduct(product);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdateProduct = async () => {
    try {
      setIsLoading(true);
      await updateProduct(id, {
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        images: images,
      });
      await getProduct();
      showNotification("Produto atualizado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao atualizar produto`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      showNotification("Produto deletado com sucesso", "success");
      router.push("/products");
    } catch (err) {
      showNotification(`${err} Falha ao deletar produto`, "error");
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };


  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [form, setForm] = useState({
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const numericValue = (parseInt(value || "0", 10) / 100).toFixed(2); // Divide por 100 e formata
    setForm({ ...form, [e.target.name]: numericValue });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };


  return {
    isLoading,
    form,
    setForm,
    handlePriceChange,
    handleChange,
    handleUpdateProduct,
    handleModal,
    handleDeleteProduct,
    handleImageChange,
    isModalOpen,
    product
  };
}
