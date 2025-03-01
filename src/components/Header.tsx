import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

import Search from './Search';
import { useGetProviders } from '../api/useGetProviders';
import Virtualize from './AutocompleteVirtualization';

export default function Header() {
  const { data: providers, loading: loadingProviders } = useGetProviders();

  console.log('loading', providers, loadingProviders);
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <Virtualize data={providers} />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
