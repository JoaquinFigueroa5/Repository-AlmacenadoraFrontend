import { useState } from "react";
import toast from "react-hot-toast";
import { getMovimientos as getMovimientosRequest } from "../../services/api";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getMovimientos = async (isLogged = false) => {
    setIsFetching(true); // Establecer el estado de carga antes de hacer la solicitud.

    const movimientosData = await getMovimientosRequest();

    setIsFetching(false); // Finaliza la carga después de la respuesta.

    if (movimientosData.error) {
      toast.error(movimientosData.e?.response?.data || 'Error al traer los movimientos');
      return;
    }

    
    setMovimientos(movimientosData.data); 

    if (isLogged) {
      return { movimientos: movimientosData?.data };
    }
  };

  return {
    movimientos, 
    isFetching, 
    getMovimientos, 
  };
};
