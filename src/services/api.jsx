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
            config.headers['x-token'] = token
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

export const updateUser = async (userId, data) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, data);
        return response;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
}



export const getUsers = async() => {
    try {
        return await apiClient.get('/users')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getUserById = async(id) => {
    try {
        const response = await apiClient.get(`/users/${id}`)
        return response.data
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteUser = async(userId) => {
    try {
        return await apiClient.delete(`/users/${userId}`)

    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status

    if(responseStatus){
        (responseStatus === 401 || responseStatus === 403) && logout()
    }
}