import useSWR from 'swr';
import { fetcher } from './fetcher';
import { endpoints } from './endpoints';
import { useMemo } from 'react';

const options = {
  revalidateIfState: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const URL = endpoints.getDataCustomers.path;

export function useGetCustomers() {
  const { data, isLoading, isValidating, error } = useSWR(
    URL,
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
