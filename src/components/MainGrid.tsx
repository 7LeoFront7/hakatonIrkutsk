import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import StatCard, { StatCardProps } from './StatCard';
import TableSession from '../components/TableSession';
import StartEndPriceChart from './StartEndPriceChart';
import { v4 as uuid } from 'uuid';
import PanelsForCustomers from './PanelsForCustomers';
import TableCustomers from './TableCustomers';

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

const draggableData = [
  {
    id: uuid(),
    component: <StatCard {...data[0]} />,
  },
  {
    id: uuid(),
    component: <StatCard {...data[1]} />,
  },
  {
    id: uuid(),
    component: <StatCard {...data[2]} />,
  },
  {
    id: uuid(),
    component: <StartEndPriceChart />,
  },
  {
    id: uuid(),
    component: <PageViewsBarChart />,
  },
];

export default function MainGrid() {
  const [items, setItems] = useState(draggableData);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onEndContext = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    setItems(reorderedItems);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Главная" value="1" />
            <Tab label="Сессии КС" value="2" />
            <Tab label="Конкуренты" value="3" />
            <Tab label="Заказчик" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Overview
          </Typography>
          <DragDropContext onDragEnd={onEndContext}>
            <Droppable droppableId="mainContainer" direction="horizontal">
              {(provided) => (
                <Grid
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  container
                  spacing={2}
                  columns={12}
                  sx={{ mb: (theme) => theme.spacing(2) }}
                >
                  {items.map((el, index) => (
                    <Draggable key={el.id} draggableId={el.id} index={index}>
                      {(provided) => (
                        <Grid
                          size={
                            index < 3
                              ? { xs: 12, sm: 6, lg: 3 }
                              : { xs: 12, md: 6 }
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {el.component}
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>

          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Details
          </Typography>
          <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <CustomizedDataGrid />
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Stack
                gap={2}
                direction={{ xs: 'column', sm: 'row', lg: 'column' }}
              >
                <CustomizedTreeView />
                <ChartUserByCountry />
              </Stack>
            </Grid>
          </Grid>
          <Copyright sx={{ my: 4 }} />
        </TabPanel>
        <TabPanel value="2">
          <TableSession />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">
          <PanelsForCustomers />
          <TableCustomers />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
