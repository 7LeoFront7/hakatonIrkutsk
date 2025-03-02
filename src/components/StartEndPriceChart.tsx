import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts';
import { useGetStartEndPrice } from '../api/useGetStartEndPrice';
import { useMainContext } from '../context';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function StartEndPriceChart() {
  const theme = useTheme();
  const { innState } = useMainContext();
  const {
    data: startEndPrice,
    total_discount_sum,
    average_discount_percentage,
    dataAsis,
    dataStartPrice,
    dataEndPrice,
  } = useGetStartEndPrice(innState?.inn);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  console.log('data', dataAsis);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Уступки по выигранным КС
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
              {total_discount_sum}
            </Typography>
            <Chip
              size="small"
              color="success"
              label={average_discount_percentage}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Уступки по выигранным КС за последние 2 года
          </Typography>
        </Stack>
        <BarChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              data: dataAsis,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'startPrice',
              label: 'Start Price',
              stack: 'A',
              data: dataStartPrice,
            },
            {
              id: 'endPrice',
              label: 'End Price',
              stack: 'A',
              data: dataEndPrice,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')",
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')",
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        ></BarChart>
        {/* <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: dataAsis,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: 'startPrice',
              label: 'Start Price',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: dataStartPrice,
            },
            {
              id: 'endPrice',
              label: 'End Price',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: dataEndPrice,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')",
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')",
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart> */}
      </CardContent>
    </Card>
  );
}
