import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL||"http://localhost:3000",
    headers:{
        "Content-Type":"application/jsom"
    },
    timeout:1000
})


api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token")
        if(token)
            config.headers.Authorization=`Bearer ${token}`;

        return config;
    }
)

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            console.warn("unauthorized")
        }

        return Promise.reject(error)
    }

)


export default api