import useSWR from 'swr';
import axios from 'axios';

// Функция-фетчер для SWR с использованием axios
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Кастомный хук для выполнения GET-запроса с использованием SWR
function useSwrFetch<T>(url: string | null) {
    const { data, error, isLoading, isValidating } = useSWR<T>(url, fetcher, {
        revalidateOnFocus: false, // Отключаем ревалидацию при фокусе окна
        shouldRetryOnError: false, // Отключаем повторные запросы при ошибке
    });

    return {
        data, // Данные, полученные от API
        isLoading, // Состояние загрузки (первый запрос)
        isValidating, // Состояние ревалидации (повторный запрос)
        error, // Ошибка, если она возникла
    };
}

export default useSwrFetch;