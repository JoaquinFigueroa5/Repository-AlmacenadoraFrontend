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

export const getProducts = async() => {
    try {
        return await apiClient.get('/products/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getStats = async() => {
    try {
        return await apiClient.get('/products/Stats')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getPercentage = async() => {
    try {
        return await apiClient.get('/products/percentage')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getTotalC = async() => {
    try {
        return await apiClient.get('/clients/total')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getEarnings = async() => {
    try {
        return await apiClient.get('/products/earnings')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getTop = async() => {
    try {
        return await apiClient.get('/products/top')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getTop3 = async() => {
    try {
        return await apiClient.get('/products/top3')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}