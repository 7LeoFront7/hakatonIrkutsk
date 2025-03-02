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
import { useMainContext } from '../context';
import { useGetParticipationYear } from '../api/useGetParticipationYear';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from '@mui/material/Button';
import TableConcurents from './TableConcurents';

const generatePdf = (id) => {
  const input = document.getElementById(`custom-tab-panel-${id}`); // Убедитесь, что у вас есть id для содержимого таба
  if (!input) {
    console.error('Element with id "custom-tab-panel" not found');
    return;
  }

  if (input) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 размер, портретная ориентация
      const imgWidth = 210; // Ширина A4 в мм
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Масштабируем высоту

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('report.pdf'); // Сохраняем PDF
    });
  }
};

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

function allyProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabPanel = ({ children, el, ...other }) => {
  if (children)
    return (
      <TabPanel
        key={String(el.id)}
        value={String(el.id)}
        id={`custom-tab-panel-${el.id}`}
        {...other}
      >
        {children}
      </TabPanel>
    );
  return (
    <TabPanel
      key={String(el.id)}
      value={String(el.id)}
      id={`custom-tab-panel-${el.id}`}
      {...other}
    >
      {el.id}
    </TabPanel>
  );
};

const Portal = () => {
  return <div>set</div>;
};

export default function MainGrid() {
  const { tabs, currentTab, onSetCurrentTab, innState } = useMainContext();
  const { data: dataParticipationYear } = useGetParticipationYear(
    innState?.inn
  );

  const draggableData = [
    {
      id: uuid(),
      component: <StartEndPriceChart />,
    },
    {
      id: uuid(),
      component: <PageViewsBarChart />,
    },
  ];
  const [items, setItems] = useState(draggableData);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onSetCurrentTab(newValue);
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
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            {tabs.map((el) => (
              <Tab
                key={String(el.id)}
                label={el.label}
                {...allyProps(el.id)}
                v
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map((el) => {
          return (
            <CustomTabPanel el={el}>
              {el.id === 0 && (
                <>
                  <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Обзор
                  </Typography>
                  <DragDropContext onDragEnd={onEndContext}>
                    <Droppable
                      droppableId="mainContainer"
                      direction="horizontal"
                    >
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
                            <Draggable
                              key={el.id}
                              draggableId={el.id}
                              index={index}
                            >
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

                  <Copyright sx={{ my: 4 }} />
                </>
              )}
              {el.id === 1 && <TableSession />}
              {el.id === 2 && <TableConcurents />}
              {el.id === 3 && (
                <>
                  <PanelsForCustomers />
                  <TableCustomers />
                </>
              )}
              {el.id > 3 && <Portal></Portal>}
            </CustomTabPanel>
          );
        })}
      </TabContext>

      <Button variant="contained" onClick={() => generatePdf(currentTab)}>
        Export PDF
      </Button>
    </Box>
  );
}
