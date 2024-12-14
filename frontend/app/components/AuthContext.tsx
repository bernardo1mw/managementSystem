'use client'
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
// import styles from "./home.module.css"
import SignIn from "../signin/page";
import SignUp from "../signup/page";
import { jwtAuthCheck } from "../services/api/user";

export default function AuthContext({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  const verifyToken = useCallback(async () => {
    try {

      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/signin")
        return
      }

      const response: any = await jwtAuthCheck()
      if (!response) {
        router.push("/signin")
      }
      console.log("RES: " ,response)
      localStorage.setItem("email", response)

      if (pathname === "/signin" || pathname === "/signup" || pathname === "/forgot-password") {
        router.push("/")
      }
    } catch (error) {
      console.error("Error during token verification:", error)
      router.push("/signin")
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    verifyToken()
  }, [])

  if (isLoading) {
    return (
      // <div id={styles.loading_screen}>
      <div>  
        <Image src={"full-logo.svg"} alt="SalesLights Logo" draggable="false" priority width={200} height={200} />
      </div>
    )
  }

  switch (pathname) {
    case "/signin":
      return <SignIn />
    case "/signup":
      return <SignUp />
    default:
      return <>{children}</>
  }
}
