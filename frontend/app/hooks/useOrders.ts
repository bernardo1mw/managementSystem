import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrder,
} from "../services/api/order";

export function useOrdersHook() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orderProducts, setOrderProducts] = useState<any>([]);


  const [newOrderForm, setNewOrderForm] = useState({
    description: "",
    price: "",
    stock: "",
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOrderForm({ ...newOrderForm, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    createNewOrder();
  };

  const getOrders = async () => {
    const orders = await fetchAllOrders();
    setOrders(orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const createNewOrder = async () => {
    try {
      setIsLoading(true);
      await createOrder({
        customerId: selectedCustomer,
        items: orderProducts.map((item: any) => {
          return {
            productId: item.product.id,
            price: item.product.price,
            quantity: item.quantity
          }
        })
      });
      await getOrders();
      showNotification("Pedido criado com sucesso", "success");
      router.push("/orders");
    } catch (err) {
      showNotification(`${err} Falha ao criar pedido`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteOrder(selectedOrder.id);
      await getOrders();
      showNotification("Produto deletado com sucesso", "success");
    } catch (err) {
      showNotification(`${err} Falha ao deletar produto`, "error");
    } finally {
      setIsDeleteModalOpen(false);
      setIsLoading(false);
    }
  };

  const handleDeleteModal = (order?: any) => {
    if (order) setSelectedOrder(order);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleOrderModal = (order?: any) => {
    if (order) setSelectedOrder(order);
    setIsOrderModalOpen(!isOrderModalOpen);
  };

  const handleAddProduct = ( product: any ) => {
    if (!product || quantity <= 0) return;

    // Check if product is already in the order
    const existingProductIndex = orderProducts.findIndex(
      (op: any) => op.product.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedOrderProducts = [...orderProducts];
      updatedOrderProducts[existingProductIndex].quantity += quantity;
      setOrderProducts(updatedOrderProducts);
    } else {
      setOrderProducts([...orderProducts, { product, quantity }]);
    }
  };

  const handleView = async (orderId: number) => {
    try {
      const response = await fetchOrder(orderId)
      setSelectedOrder(response)
      setIsOrderModalOpen(!isOrderModalOpen)
    } catch (err) {
      showNotification(`${err} Falha ao buscar pedido`, "error");
    }
  }

  return {
    isDeleteModalOpen,
    handleDeleteModal,
    orderProducts,
    selectedOrder,
    isLoading,
    isOrderModalOpen,
    orders,
    handleDelete,
    handleCreateOrder,
    handleChange,
    selectedCustomer,
    setSelectedCustomer,
    quantity,
    setQuantity,
    handleAddProduct,
    handleView,
    handleOrderModal
  };
}
