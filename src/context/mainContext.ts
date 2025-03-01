import { useContext, createContext } from 'react';

export const MainContext = createContext({});

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context)
    throw new Error('useMainContext must be use inside MainProvider');

  return context;
};
