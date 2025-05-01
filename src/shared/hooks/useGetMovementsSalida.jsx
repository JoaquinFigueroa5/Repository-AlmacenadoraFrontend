import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovimientoSalida as getMovimientoSalidaRequest } from '../../services';
import toast from "react-hot-toast";

export const useOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registrarMovimientoSalida = async (productId, quantity,reason,destiny) => {
    setIsLoading(true);
    try {
      const response = await getMovimientoSalidaRequest({ productId, quantity, reason,destiny }); // Llama a la función de la API sin pasar el token
      setIsLoading(false);

      if (response?.error) {
        return toast.error(response.error?.response?.data || 'Ocurrió un error al registrar la entrada, intente de nuevo');
      }

      toast.success('Entrada registrada con éxito!');
      navigate('/movimientos');

    } catch (error) {
      setIsLoading(false);
      toast.error('Ocurrió un error inesperado al registrar la entrada.');
      console.error("Error al registrar entrada:", error);
    }
  };

  return {
    registrarMovimientoSalida,
    isLoading
  };
};