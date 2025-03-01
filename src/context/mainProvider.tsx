import { useCallback, useMemo, useState } from 'react';
import { MainContext } from './mainContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'inn';
export function MainProvider({ children, value }) {
  const [innState, setInnState] = useState(null);
  const { state, update, reset } = useLocalStorage(STORAGE_KEY);

  const onSetInnState = useCallback((arg) => {
    setInnState(arg);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...value,
      innState,
      onSetInnState,
    }),
    [value, innState, onSetInnState]
  );

  return (
    <MainContext.Provider value={memoizedValue}>
      {children}
    </MainContext.Provider>
  );
}
