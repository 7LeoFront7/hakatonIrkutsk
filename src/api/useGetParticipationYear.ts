import useSWR from 'swr';
import { fetcher } from './fetcher';
import { endpoints } from './endpoints';
import { useMemo } from 'react';

const options = {
  revalidateIfState: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const URL = endpoints.getParticipationYear.path;

export function useGetParticipationYear(inn) {
  const url = inn ? `${URL}` : null;
  const params = { inn };
  const { data, isLoading, isValidating, error } = useSWR(
    [url, { params }],
    fetcher,
    options
  );

  const memoizedValue = useMemo(() => {
    if (data) {
      return {
        data: data?.data || [],
        all_wins_count: data.summary?.all_wins_count,
        all_wins_percentage: data.summary?.all_wins_percentage,
        loading: isLoading,
        validating: isValidating,
        error,
      };
    }
    return {
      data: [],
      all_wins_count: 0,
      all_wins_percentage: 0,
      loading: isLoading,
      validating: isValidating,
      error,
    };
  }, [data, isLoading, isValidating, error]);

  return memoizedValue;
}
