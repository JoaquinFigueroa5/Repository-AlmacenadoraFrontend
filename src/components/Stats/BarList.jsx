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
import { useProduct } from "../../shared/hooks";
import { Heading, useColorModeValue } from '@chakra-ui/react';

const BarListComponent = () => {
  const { products, getProducts, isFetching } = useProduct();
  const [chartData, setChartData] = useState([]);
  const bgText = useColorModeValue('black', 'black')

  useEffect(() => {
    if (!products && !isFetching) {
      getProducts();
    }
  }, [getProducts, products, isFetching]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredData = products.map((product) => ({
        name: product.name,
        sales: product.sales,
      }));
      setChartData(filteredData);
    }
  }, [products]);

  if (isFetching || !products) {
    return (
      <div style={{ width: '100vh', height: '50vh' }}>
        <ResponsiveContainer>
          <BarChart data={[]} />
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ width: '100vh', height: '50vh', marginTop: '20px', marginBottom: '50px' }}>
      <Heading as={'h2'} mb={3} textColor={bgText} >Ventas por Producto</Heading>
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
