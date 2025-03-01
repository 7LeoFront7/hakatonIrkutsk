import useSWR from 'swr';
import { fetcher } from './fetcher';
import { endpoints } from './endpoints';
import { useMemo } from 'react';

const options = {
  revalidateIfState: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const URL = `${endpoints.getDataStartEndPrice.path}`;

export function useGetStartEndPrice(inn) {
  const url = inn ? `${URL}` : null;
  const params = { inn };
  const { data, isLoading, isValidating, error } = useSWR(
    [url, { params }],
    fetcher,
    options
  );

  const memoizedValue = useMemo(() => {
    return {
      data: data || [],
      dateAsis: data ? data.map((el) => el.ks_date) : [],
      dataStartPrice: data ? data.map((el) => el.ks_start_price) : [],
      dataEndPrice: data ? data.map((el) => el.ks_end_price) : [],
      loading: isLoading,
      validating: isValidating,
      error,
    };
  }, [data, isLoading, isValidating, error]);

  return memoizedValue;
}
