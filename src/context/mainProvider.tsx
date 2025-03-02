import { ReactSVGElement, useCallback, useMemo, useState } from 'react';
import { MainContext } from './mainContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const STORAGE_KEY = 'inn';

interface TabData {
  id: number;
  label: string;
  icon: ReactSVGElement;
  content: string;
}

export function MainProvider({ children, defaultValue }) {
  const [innState, setInnState] = useState({ inn: null, name: '', region: '' });
  const [currentTab, setCurrentTab] = useState('1');
  const [tabs, setTabs] = useState<TabData[]>([
    {
      id: 0,
      label: 'Главная',
      icon: <HomeRoundedIcon />,
      content: 'Content for Tab One',
    },
    {
      id: 1,
      label: 'Сессии КС',
      icon: <AnalyticsRoundedIcon />,
      content: 'Content for Tab Two',
    },
    {
      id: 2,
      label: 'Конкуренты',
      icon: <PeopleRoundedIcon />,
      content: 'Content for Tab Three',
    },
    {
      id: 3,
      label: 'Заказчик',
      icon: <AssignmentRoundedIcon />,
      content: 'Content for Tab Thour',
    },
  ]);

  const { state, update, reset } = useLocalStorage(STORAGE_KEY);

  const onSetTabs = useCallback(
    (newTab) => {
      setTabs([...tabs, newTab]);
    },
    [tabs]
  );

  const onSetInnState = useCallback((arg) => {
    setInnState(arg);
  }, []);

  const onSetCurrentTab = useCallback((newValue) => {
    const strValue = String(newValue);
    setCurrentTab(strValue);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...defaultValue,
      innState,
      tabs,
      currentTab,
      onSetInnState,
      onSetTabs,
      onSetCurrentTab,
    }),
    [
      defaultValue,
      tabs,
      innState,
      currentTab,
      onSetInnState,
      onSetTabs,
      onSetCurrentTab,
    ]
  );

  return (
    <MainContext.Provider value={memoizedValue}>
      {children}
    </MainContext.Provider>
  );
}
