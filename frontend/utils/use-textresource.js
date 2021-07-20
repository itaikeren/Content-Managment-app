import useSWR from "swr";
import axios from "axios";

const fetcher = async (...params) => await axios.get(params[0]).then((res) => res.data.tr);

export default function useTextResources(trId) {
  const { data, mutate, error } = useSWR([`http://localhost:5000/tr/${trId}`], fetcher, {
    refreshInterval: 1000,
  });

  return {
    loading: !error && !data,
    isError: error,
    tr: data,
    mutate,
  };
}
