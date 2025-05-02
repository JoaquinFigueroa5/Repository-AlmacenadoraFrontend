import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getPercentage as getPercentageRequest } from "../../services/api";

export const usePercentage = () => {
  const [percentage, setPercentage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getPercentage = useCallback(async (isLogged = false) => {
    setIsFetching(true);

    try {
      const axiosResponse = await getPercentageRequest(); // Esta es la respuesta completa de Axios
      console.log('Respuesta Axios completa:', axiosResponse);
      
      setIsFetching(false);

      // La estructura que necesitamos está en axiosResponse.data.data
      if (axiosResponse?.data?.success && Array.isArray(axiosResponse.data.data)) {
        // Accedemos directamente al array dentro de axiosResponse.data.data
        const rawData = axiosResponse.data.data;
        console.log('Array de datos:', rawData);
        
        const formattedData = rawData.map((item) => ({
          name: item.name,
          value: parseFloat(item.salesPercentage),
        }));

        console.log('Datos formateados:', formattedData);
        setPercentage(formattedData);
      } else {
        console.error('Estructura de datos inesperada:', axiosResponse);
        toast.error('Datos de porcentaje no disponibles');
      }
      
      if (isLogged) {
        return { percentage: axiosResponse?.data?.data };
      }
    } catch (error) {
      setIsFetching(false);
      toast.error('Error de conexión. Intenta nuevamente');
      console.error('Error al obtener los porcentajes:', error);
    }
  }, []);

  return {
    percentage,
    isFetching,
    getPercentage,
  };
};