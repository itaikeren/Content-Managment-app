import useSWR from "swr";
import axios from "axios";

const fetcher = async (...params) => await axios.get(params[0]).then((res) => res.data.pages);

export default function usePages() {
  const { data, mutate, error } = useSWR(["http://localhost:5000/pages/"], fetcher, {
    refreshInterval: 1000,
  });

  return {
    isLoading: !error && !data,
    isError: error,
    pages: data,
    mutate,
  };
}
