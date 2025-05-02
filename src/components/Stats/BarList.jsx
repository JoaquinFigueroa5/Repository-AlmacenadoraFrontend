import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useProducts } from "../../shared/hooks";
import { Heading } from '@chakra-ui/react';

const BarListComponent = () => {
  const { products, getProducts, isFetching } = useProducts();
  const [chartData, setChartData] = useState([]);

  // Llamamos a getProducts cuando el componente se monta
  useEffect(() => {
    if (!products && !isFetching) { // Solo obtener los productos si no han sido obtenidos ya
      getProducts(); // Cargamos los productos
    }
  }, [getProducts, products, isFetching]);

  useEffect(() => {
    if (products) {
      const filteredData = products.map((product) => ({
        name: product.name,
        sales: product.sales,
      }));
      setChartData(filteredData);
    }
  }, [products]);

  if (isFetching) {
    return (
      <div style={{ width: '100vh', height: '50vh' }}>
        <ResponsiveContainer>
          <BarChart data={[]} />
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ width: '100vh', height: '50vh', marginTop: '20px' ,marginBottom: '50px'}}>
      <Heading as={'h2'} mb={3}>Ventas por Producto</Heading>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#A8C0BA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarListComponent;


