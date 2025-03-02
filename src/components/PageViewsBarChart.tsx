import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { useMainContext } from '../context';
import { useGetParticipationYear } from '../api/useGetParticipationYear';

export default function PageViewsBarChart() {
  const { innState } = useMainContext();
  const {
    data: dataParticipationYear,
    all_wins_count,
    all_wins_percentage,
    dataAsis,
    dataWinsCount,
    dataPartsCount,
  } = useGetParticipationYear(innState?.inn);
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Количество контрактов по годам
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {all_wins_count}
            </Typography>
            <Chip size="small" color="error" label={all_wins_percentage} />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Количество контрактов по годам за последние 10 лет
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                data: dataAsis,
              },
            ] as any
          }
          series={[
            {
              id: 'page-views',
              label: 'Количество участий в КС',
              data: dataPartsCount,
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Количество побед',
              data: dataWinsCount,
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
