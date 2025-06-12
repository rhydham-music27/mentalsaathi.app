const { default: axios } = require("axios");

export const authApi = axios.create({
    baseURL:"https://mentalsaathi-express-backend.onrender.com/api/v1/auth",
    timeout:10000
})