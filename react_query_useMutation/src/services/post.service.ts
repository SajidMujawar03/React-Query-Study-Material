import api from "../config/axios.config";


export const getPosts=()=>{
    return api.get('/posts')
}

export const createPost=(post:any)=>{
    return api.post('/posts',post)
}