import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from '../../services';
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const register = async(email, name, password, phone, surname, username) => {

        setIsLoading(true)

        const response = await registerRequest({ email, name, password, phone, surname, username})

        setIsLoading(false)

        if(response.error){
            return toast.error(response.error?.response?.data || 'Ocurrio un error al registrarse, intente de nuevo', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            }) 
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success('Usuario registrado con exito!', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        navigate('/')

    }

    return {
        register,
        isLoading
    }
}