import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { TextField } from '@mui/material';
import { useMainContext } from '../context';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';

interface TabData {
  id: number;
  label: string;
  icon: ReactSVGElement;
  content: string;
}

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [newTabLabel, setNewTabLabel] = React.useState('');
  const { tabs, onSetTabs, onSetCurrentTab } = useMainContext();
  const handleChange = (e) => setNewTabLabel(e.target.value);
  const addTab = () => {
    if (newTabLabel.trim()) {
      const newTab: TabData = {
        id: tabs.length,
        label: newTabLabel,
        icon: <DashboardCustomizeRoundedIcon />,
        content: `Content for ${newTabLabel}`,
      };
      onSetTabs(newTab);
      setNewTabLabel('');
    }
  };

  const handleClick = (value) => {
    const strValue = String(value);
    onSetCurrentTab(strValue);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {tabs.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleClick(index)}
              selected={index === tabs.id}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemButton sx={{ p: 9 }} onClick={addTab}>
            <ListItemIcon>
              <AddRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
          <TextField
            size="small"
            value={newTabLabel}
            onChange={handleChange}
            placeholder="Добавить дашбоард"
          />
        </ListItem>
      </List>
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}
