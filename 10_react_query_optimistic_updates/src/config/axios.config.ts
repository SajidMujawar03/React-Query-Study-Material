import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
        timeout: 3000,
        headers: {
            "Content-Type": "application/json"
        }
    }
)


api.interceptors.response.use((request) => request,
    (error) => {
        if (error.response?.status === 401)
            console.warn("unauthorized")


        return Promise.reject(error)
    })



api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config;
})

export default api;