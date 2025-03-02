import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useMainContext } from '../context';

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key, ...optionProps } = dataSet[0];
  return (
    <Typography
      key={key}
      component="li"
      {...optionProps}
      noWrap
      style={inlineStyle}
    >
      {`${dataSet[1].name} (ИНН:${dataSet[1].inn}) ${dataSet[1].region}`}
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
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement<unknown>[] = [];
  (children as React.ReactElement<unknown>[]).forEach(
    (
      item: React.ReactElement<unknown> & {
        children?: React.ReactElement<unknown>[];
      }
    ) => {
      itemData.push(item);
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement<unknown>) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
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
          itemSize={(index) => getChildSize(itemData[index])}
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

export default function Virtualize({ data, loading }) {
  const [inputValue, setInputValue] = useState('');
  const { innState, onSetInnState } = useMainContext();

  const filterOptions = (options, { inputValue }) => {
    const search = inputValue;
    return options.filter((option) => option.inn.toString().startsWith(search));
  };

  return (
    <Autocomplete
      sx={{
        width: 600,
        '& MuiAutocomplete-popupIndicator': { border: 'none' },
        '& MuiAutocomplete-clearIndicator': { border: 'none' },
        flexGrow: 1,
      }}
      value={innState}
      onChange={(event, newInputValue) => {
        onSetInnState(newInputValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disableListWrap
      options={data}
      loading={loading}
      getOptionLabel={(option) => String(option?.name) || ''}
      filterOptions={filterOptions}
      renderInput={(params) => <TextField {...params} label="ИНН поставщика" />}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
    />
  );
}
