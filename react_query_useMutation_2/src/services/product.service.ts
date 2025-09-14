import api from "../config/axios.config";

export const getProducts = async () => {
  return (await api.get("/products")).data;
};

export const uploadProduct = async (product: any) => {
  return (await api.post("/products", product)).data;
};
