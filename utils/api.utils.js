const { default: axios } = require("axios");

export const authApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/auth",
    timeout: 10000
})
export const postApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/post",
    timeout: 10000
})
export const toolsApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/tools",
    timeout: 10000
})
export const adminApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/admin", 
    timeout: 10000
})
export const therapistApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/therapist", 
    timeout: 10000
})
export const mediaApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/media", 
    timeout: 10000
})
export const streamApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/stream", 
    timeout: 10000
})
export const emailApi = axios.create({
    baseURL: "https://mentalsaathi-express-backend.onrender.com/api/v1/email", 
    timeout: 10000
})