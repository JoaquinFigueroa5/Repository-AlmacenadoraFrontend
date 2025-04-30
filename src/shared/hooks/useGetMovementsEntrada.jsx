import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovimientoEntrada as getMovimientoEntradaRequest } from '../../services';
import toast from "react-hot-toast";

export const useEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registrarMovimientoEntrada = async (productId, quantity) => {
    setIsLoading(true);
    try {
      const response = await getMovimientoEntradaRequest({ productId, quantity }); // Llama a la función de la API sin pasar el token
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
    registrarMovimientoEntrada,
    isLoading
  };
};