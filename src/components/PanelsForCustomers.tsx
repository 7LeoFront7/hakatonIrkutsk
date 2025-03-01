import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomDatePicker from './CustomDatePicker';
import { useGetCustomers } from '../api/useGetCustomers';

export default function SelectSmall() {
  // Инициализация состояния как объекта
  const [customersListCs, setCustomersListCs] = React.useState({
    kpgz: null,
    customer: null,
    cs: null,
    dateStart: null,
    dateEnd: null,
    city: null,
    kc: null, // По умолчанию "Показать все"
  });

  // Обработчик изменений для всех селектов
  const handleChange = (field) => (event) => {
    setCustomersListCs({
      ...customersListCs,
      [field]: event.target.value,
    });
  };

  const kcHardData = {
    participated: 'Участвовал',
    noParticipated: 'Не участвовал',
    all: 'Показать все',
  };

  return (
    <LocalizationProvider>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="customer-select-label">Заказчик</InputLabel>
        <Select
          labelId="customer-select"
          id="customer-select"
          value={customersListCs.customer}
          label="Заказчик"
          onChange={handleChange('customer')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>

      {/* Селект для ГПКЗ */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="gpkz-select-label">ГПКЗ</InputLabel>
        <Select
          labelId="gpkz-select"
          id="gpkz-select"
          value={customersListCs.kpgz}
          label="ГПКЗ"
          onChange={handleChange('kpgz')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Первый</MenuItem>
          <MenuItem value={20}>Второй</MenuItem>
          <MenuItem value={30}>Третий</MenuItem>
        </Select>
      </FormControl>

      {/* Кастомные DatePicker для дат */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <CustomDatePicker
          label="Дата начала"
          value={customersListCs.dateStart}
          onChange={(date) =>
            setCustomersListCs({ ...customersListCs, dateStart: date })
          }
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <CustomDatePicker
          label="Дата окончания"
          value={customersListCs.dateEnd}
          onChange={(date) =>
            setCustomersListCs({ ...customersListCs, dateEnd: date })
          }
        />
      </FormControl>

      {/* Селект для участника в КС */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="kc-select-label">Участник в КС</InputLabel>
        <Select
          labelId="kc-select"
          id="kc-select"
          value={customersListCs.kc}
          label="Участник в КС"
          onChange={handleChange('kc')}
        >
          {Object.entries(kcHardData).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Селект для города */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="city-select-label">Город</InputLabel>
        <Select
          labelId="city-select"
          id="city-select"
          value={customersListCs.city}
          label="Город"
          onChange={handleChange('city')}
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
