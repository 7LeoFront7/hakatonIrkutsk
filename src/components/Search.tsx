import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box } from '@mui/material';

export default function Search() {
  return (
    <Box
     component="div"
     sx={{display: "flex", flex: 1 }}
     >
    <FormControl sx={{ width: { xs: '100%', md: '100%' }, flexGrow:1 }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="ИНН поставщика"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>

    </Box>
  );
}
