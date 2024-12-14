import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
} from "../services/api/product";
import { useRouter } from "next/navigation";

export function useProductsHook() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [images, setImages] = useState<File[]>([]);

  const [newProductForm, setNewProductForm] = useState({
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductForm({ ...newProductForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createNewProduct({ ...newProductForm, images: images });
  };

  const getProducts = async () => {
    const products = await fetchAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createNewProduct = async (input: {
    description: string;
    price: string;
    stock: string;
    images: File[];
  }) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("description", newProductForm.description);
      formData.append("price", newProductForm.price);
      formData.append("stock", newProductForm.stock)
      images.forEach((image) => formData.append("files", image));
      await createProduct(formData);
      await getProducts();
      showNotification("Produto cadastrado com sucesso", "success");
      router.push("/products");
    } catch (err) {
      showNotification(`${err} Falha ao cadastrar produto`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(selectedProduct.id);
      await getProducts();
      showNotification("Produto deletado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao deletar produto`, "error");
    } finally {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteButton = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePriceChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const numericValue = (parseInt(value || "0", 10) / 100).toFixed(2); // Divide por 100 e formata
    setNewProductForm({ ...newProductForm, [e.target.name]: numericValue });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Converte FileList para array
    }
  };

  return {
    newProductForm,
    setSelectedProduct,
    handlePriceChange,
    products,
    getProducts,
    createNewProduct,
    isLoading,
    handleDeleteProduct,
    handleCloseModal,
    isModalOpen,
    setIsModalOpen,
    handleDeleteButton,
    selectedProduct,
    handleSubmit,
    handleChange,
    handleImageChange,
    images
  };
}
