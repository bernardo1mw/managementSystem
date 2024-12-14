import { Axios } from "@/lib/axios"

interface UserData {
  email: string
  password: string
}

interface SignupData {
  email: string
  password: string
}
  

export const signin = async (email: string, password: string) => {
  try {
    const data: UserData = { email, password }
    const response = await Axios.post(`/auth/signin`, data)

    return response.data;
  } catch (error) {
    console.error(error)
    throw new Error("Unable to login")
  }
}

export const signup = async (email: string, password: string) => {
  try {
    const data: SignupData = { email, password }
    const response = await Axios.post(`/auth/signup`, data)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Unable to signup")
  }
}

export const jwtAuthCheck = async () => {
  try {
    const response = await Axios.get(`/auth/verify`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Unable to check JWT Auth")
  }
}
