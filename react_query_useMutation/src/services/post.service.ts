import type { AxiosResponse } from "axios";
import api from "../config/axios.config";
import type { PostType } from "../types/types";


export const getPosts=async ():Promise<AxiosResponse<any>>=>{
    return await api.get('/posts')
}

export const createPost=async(post:PostType)=>{
    return await api.post('/posts',post)
}