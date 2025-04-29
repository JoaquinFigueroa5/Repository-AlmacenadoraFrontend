import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/almacenadora/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if(useUserDetails){
            const token = JSON.parse(useUserDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const login = async(data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async(data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProducts = async () => {
    try {
        return await apiClient.get('/products')
    } catch (e) {
        error: true,
        e
    }
}