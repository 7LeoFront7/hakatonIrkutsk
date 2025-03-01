import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';
import { useMainContext } from '../context';

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const option = data[index]; // Данные опции
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Typography component="li" noWrap style={inlineStyle}>
      {option.name} (ИНН: {option.inn})
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & { itemData: any[] }
>(function ListboxComponent(props, ref) {
  const { children, itemData, ...other } = props;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemCount * itemSize;
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={() => itemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export default function Virtualize({ data }) {
  const [inputValue, setInputValue] = React.useState('');
  const { innState, onSetInnState } = useMainContext();

  // Функция фильтрации опций по ИНН
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.inn.toString().includes(inputValue)
    );
  };

  console.log('state', innState);

  const handleChange = (event: any, newValue: string | null) => {
    onSetInnState(newValue);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      disableListWrap
      options={data}
      inputValue={inputValue}
      onChange={handleChange}
      filterOptions={filterOptions} // Добавляем кастомную фильтрацию
      renderInput={(params) => (
        <TextField {...params} label="Выберите организацию" />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.inn}>
          {option.name} (ИНН: {option.inn})
        </li>
      )}
      getOptionLabel={(option) => option.name}
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
          itemData: data.filter((option) =>
            option.inn.toString().includes(inputValue)
          ), // Фильтруем данные для виртуального списка
        },
      }}
    />
  );
}
