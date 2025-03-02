import useSWR from 'swr';
import { fetcher } from './fetcher';
import { endpoints } from './endpoints';
import { useMemo } from 'react';

const options = {
  revalidateIfState: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const URL = `${endpoints.getDataCompetitorsByInn}`;

export function useGetCompetitorsByInn(inn) {
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
      loading: isLoading,
      validating: isValidating,
      error,
    };
  }, [data, isLoading, isValidating, error]);

  return memoizedValue;
}
