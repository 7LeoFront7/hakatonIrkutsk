import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
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
  const { data: startEndPrice } = useGetStartEndPrice(innState?.inn);
  const dateAsis = startEndPrice
    ? (startEndPrice || []).map((el) => el.ks_date)
    : [];
  const dataStartPrice = startEndPrice
    ? (startEndPrice || []).map((el) => el.ks_start_price)
    : [];
  const dataEndPrice = startEndPrice
    ? (startEndPrice || []).map((el) => el.ks_end_price)
    : [];

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  console.log('chart', startEndPrice);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Sessions
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
              13,277
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Sessions per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: dateAsis,
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
        </LineChart>
      </CardContent>
    </Card>
  );
}
