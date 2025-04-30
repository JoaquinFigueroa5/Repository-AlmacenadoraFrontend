import { useState } from "react";
import toast from "react-hot-toast";
import { getPercentage as getPercentageRequest } from "../../services/api";

export const usePercentage = () => {
  const [percentage, setPercentage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getPercentage = async (isLogged = false) => {
    setIsFetching(true); // Establecer el estado de carga antes de hacer la solicitud.

    try {
      const percentageData = await getPercentageRequest(); // Llamada al API

      setIsFetching(false); // Finaliza la carga después de la respuesta.

      // Verifica si la respuesta tiene un error
      if (percentageData?.error) {
        toast.error(percentageData?.e?.response?.data || 'Error al traer los porcentajes');
        return;
      }

      // Verifica si los datos están disponibles
      if (percentageData?.data) {
        setPercentage(percentageData.data); 
      } else {
        toast.error('Datos de porcentaje no disponibles');
      }

      if (isLogged) {
        return { percentage: percentageData.data };
      }
    } catch (error) {
      setIsFetching(false); // Asegúrate de terminar la carga en caso de error
      toast.error('Error de conexión. Intenta nuevamente');
      console.error('Error al obtener los porcentajes:', error); // Para depuración
    }
  };

  return {
    percentage, 
    isFetching, 
    getPercentage, 
  };
};
