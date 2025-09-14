import api from "@/config/axios.config"


export const getProducts=()=>{
    return api.get("/products")
}


export const uploadProduct=(product:any)=>{
    return api.post("/products",product)
}