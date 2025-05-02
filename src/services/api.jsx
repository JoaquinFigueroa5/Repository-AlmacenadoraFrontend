import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/almacenadora/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        const res = await apiClient.post('/auth/register', data);
        return {
            success: true,
            data: res.data
        };
    } catch (e) {
        const errorList = e?.response?.data?.errors;
        const message = Array.isArray(errorList)
            ? errorList.map(err => err.msg).join('\n')
            : e?.response?.data?.msg || 'Ocurrió un error en el registro';

        return {
            success: false,
            message
        };
    }
};



export const getProducts = async () => {
    try {
        return await apiClient.get('/products')
    } catch (e) {
        return {
            error: true,
            e
        }
    }

}

export const getCategories = async () => {
    try {
        return await apiClient.get("/categories");
    } catch (e) {
        return { error: true, e };
    }
};

export const getProviders = async () => {
    try {
        return await apiClient.get("/provider");
    } catch (e) {
        return { error: true, e };
    }
};

export const saveProducts = async (data) => {
    try {
        return await apiClient.post('/products', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProducts = async (id, data) => {
    try {
        return await apiClient.put(`/products/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteProducts = async (id, body) => {
    try {
        return await apiClient.delete(`/products/${id}`, { data: body });
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};



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



export const getUsers = async () => {
    try {
        return await apiClient.get('/users')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getUserById = async (id) => {
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

export const deleteUser = async (userId) => {
    try {
        return await apiClient.delete(`/users/${userId}`)

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

const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status

    if (responseStatus) {
        (responseStatus === 401 || responseStatus === 403) && logout()
    }
}