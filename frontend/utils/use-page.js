import useSWR from "swr";
import axios from "axios";

const fetcher = async (...params) => await axios.get(params[0]).then((res) => res.data.page);

export default function usePage(pageId) {
  const { data, mutate, error } = useSWR([`http://localhost:5000/pages/${pageId}`], fetcher, {
    refreshInterval: 1000,
  });

  return {
    isLoading: !error && !data,
    isError: error,
    page: data,
    mutate,
  };
}
