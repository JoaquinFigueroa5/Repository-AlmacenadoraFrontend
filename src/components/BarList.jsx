import React from 'react';
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

const data = [
  { name: 'Google', value: 12 },
  { name: 'Direct', value: 10 },
  { name: 'Bing', value: 20 },
  { name: 'Yahoo', value: 25},
  { name: 'ChatGPT', value: 13},
];

const BarListComponent = () => {
  return (
    <div style={{ width: '100vh', height: '50vh' }}> {/* 50% de la altura de la ventana */}
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#A8C0BA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarListComponent;
