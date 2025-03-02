import axios, { AxiosRequestConfig } from 'axios';

const HOST_API = 'https://raketa-back.ru.tuna.am';

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error.response && error.response.data)
) || 'Something went wrong';

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  try {
    const response = axiosInstance.request({ ...config, url });
    return (await response).data;
  } catch (error) {
    console.error(error);
  }
};
