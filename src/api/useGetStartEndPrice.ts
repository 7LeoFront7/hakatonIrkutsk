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
    if (Array.isArray(data?.data) && data?.data.length > 0) {
      const dataAsis = data.data.map((el) => el.ks_date);
      const dataStartPrice = data.data.map((el) => el.ks_start_price);
      const dataEndPrice = data.data.map((el) => el.ks_end_price);
      return {
        data: data.data,
        total_discount_sum: data.summary.total_discount_sum,
        average_discount_percentage: data.summary.average_discount_percentage,
        dataAsis,
        dataStartPrice,
        dataEndPrice,
        loading: isLoading,
        validating: isValidating,
        error,
      };
    }
    return {
      data: [],
      total_discount_sum: 0,
      average_discount_percentage: 0,
      dataAsis: [],
      dataStartPrice: [],
      dataEndPrice: [],
      loading: isLoading,
      validating: isValidating,
      error,
    };
  }, [data, isLoading, isValidating, error]);

  return memoizedValue;
}
