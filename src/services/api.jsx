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
            console.log(token);
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

export const getMovimientos = async() => {
    try {
        return await apiClient.get('/movements/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getMovimientoEntrada = async (data) => {
    try {
      return await apiClient.post('/movements/registerEntry', data);
    } catch (e) {
      return { error: true, e };
    }
  };
  
export const getMovimientoSalida = async(data) => {
    try{
        return await apiClient.post('/movements/registerOutput', data)
    }catch(e){
        return {
            error: true,
            e
        }
    }
}