import { useCallback, useMemo, useState } from 'react';
import { MainContext } from './mainContext';

export function MainProvider({ children, value }) {
  const [innState, setInnState] = useState(null);

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
