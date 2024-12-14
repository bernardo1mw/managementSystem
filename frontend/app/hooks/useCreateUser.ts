import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signin, jwtAuthCheck, signup } from "../services/api/user";
// import { NotificationContext } from '@/app/context/NotificationContext';
import { setLocalStorage } from "../utils/localstorage";


const useCreateUser = () => {
  // const { openNotificationWithIcon } = useContext(NotificationContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generatePassword = () => {
    const randomPassword =  Math.random().toString(36).slice(-8);
    setPassword(randomPassword)
  };

  const goToSignInPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/signin");
  };

  const copyPasswordToClipboard = (password: string) => {
    navigator.clipboard.writeText(password);
    // openNotificationWithIcon("success", "Password copied to clipboard");
  };

  const createNewUser = async (email: string, password: string) => {
    try {
      const signupCheck = await signup(email, password);
      // signupCheck.status !== 'OK' && openNotificationWithIcon('error', signupCheck.err);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await createNewUser(email, password)

      const data = await signin(email, password)

      if (data.token) {
        setLocalStorage({ ...data, email })
        await jwtAuthCheck()

        router.push("/")
      } else {
        // openNotificationWithIcon('error', "Invalid username/password")
        router.push("/signin")
      }

    } catch (error) { }
  }

  return {
    email, 
    password, 
    confirmPassword, 
    error, 
    success, 
    setEmail,
    setPassword,
    setConfirmPassword,
    copyPasswordToClipboard,
    handleSignup,
    generatePassword,
  };
};

export default useCreateUser;
