import api from "../config/axios.config.ts"


export const getProducts= ()=>{
    const data= api.get("/products")
    console.log(data);
    return data
    
}


export const uploadProduct= (product:any)=>{
    return api.post("/products",product)
}