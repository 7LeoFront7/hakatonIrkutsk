import React from 'react';
import Dashboard from './Dashboard.tsx';
import { MainProvider } from './context/mainProvider.ts';
// Интерфейс для данных, которые мы ожидаем получить от API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SwrFetchComponent: React.FC = () => {
  return (
    <MainProvider value={{}}>
      <Dashboard />
    </MainProvider>
  );
};

export default SwrFetchComponent;
