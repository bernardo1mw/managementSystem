import axios from "axios"
import { ENV } from "./envs"

const Axios = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_URL,
})

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export { Axios }
