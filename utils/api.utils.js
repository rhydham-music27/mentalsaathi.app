const { default: axios } = require(`axios`);

export const authApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    timeout: 10000
})
export const postApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/post`,
    timeout: 10000
})
export const toolsApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/tools`,
    timeout: 10000
})
export const adminApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
    timeout: 10000
})
export const therapistApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/therapist`,
    timeout: 10000
})
export const mediaApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    timeout: 10000
})
export const streamApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/stream`,
    timeout: 10000
})
export const emailApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/email`,
    timeout: 10000
})
export const userApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`,
    timeout: 10000
})