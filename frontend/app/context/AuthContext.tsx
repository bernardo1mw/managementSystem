// /contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout, signin, signup, verify } from "../services/api/user";
import { setLocalStorage } from "../utils/localstorage";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/signin', '/signup']; // Rotas desprotegidas


  const isLogged = async () => {
    const loggedUser = await verify();
    if (loggedUser) {
      setUser(loggedUser);
      setIsAuthenticated(true);
    } else if (!publicRoutes.includes(pathname)) {
      router.push('/signin');
    }
  }

  useEffect( () => {
    isLogged()
  }, [pathname]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await signin(email, password);
      setLocalStorage(token)
      setUser(token);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/signin");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
