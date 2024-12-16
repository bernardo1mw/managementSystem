import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signin, verify, signup } from "../services/api/user";
// import { NotificationContext } from '@/app/context/NotificationContext';
import { setLocalStorage } from "../utils/localstorage";
import { useNotification } from "../context/NotificationContext";

const useUser = () => {
  const { showNotification } = useNotification();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("As senhas não coincidem.", "error");
      return;
    }

    try {
      await signup(email, password);
      const response = await signin(email, password);
      setLocalStorage({ token: response.token });
      router.push("/");
    } catch (err) {
      showNotification("Erro ao criar conta.", "error");
    }
  };

  return {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignup,
  };
};

export default useUser;
