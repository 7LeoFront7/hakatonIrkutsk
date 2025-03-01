import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');
  const [gpkz, setGpkz] = React.useState('');
  const [dateStart, setDateStart] = React.useState<Date | null>(null);
  const [dateEnd, setDateEnd] = React.useState<Date | null>(null);
  const [kc, setKc] = React.useState('all'); // По умолчанию "Показать все"
  const [city, setCity] = React.useState('');

  const handleChangeAge = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleChangeGpkz = (event: SelectChangeEvent) => {
    setGpkz(event.target.value);
  };

  const handleChangeDateStart = (event: SelectChangeEvent) => {
    setDateStart(event.target.value);
  };

  const handleChangeDateEnd = (event: SelectChangeEvent) => {
    setDateEnd(event.target.value);
  };

  const handleChangeKc = (event: SelectChangeEvent) => {
    setKc(event.target.value);
  };

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const kcHardData = {
    participated: 'Участвовал',
    noParticipated: 'Не участвовал',
    all: 'Показать все',
  };

  return (
    <LocalizationProvider>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Заказчик</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={age}
          label="Заказчик"
          onChange={handleChangeAge}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">ГПКЗ</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={gpkz}
          label="Заказчик"
          onChange={handleChangeGpkz}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Дата от</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={dateStart}
          label="Заказчик"
          onChange={handleChangeDateStart}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Дато До</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={dateEnd}
          label="Заказчик"
          onChange={handleChangeDateEnd}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Участник в КС</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={kc}
          label="Заказчик"
          onChange={handleChangeKc}
        >
          {Object.entries(kcHardData).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Город</InputLabel>
        <Select
          labelId="demo-select-small-customer"
          id="demo-select-small-customer"
          value={city}
          label="Заказчик"
          onChange={handleChangeCity}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>
    </LocalizationProvider>
  );
}
