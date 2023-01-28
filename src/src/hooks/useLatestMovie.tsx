import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Details } from "../interfaces/Details";

export const fetchDetails = async (key: string): Promise<Details> => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/latest`,
    {
      params: {
        api_key: key,
        language: "en-US",
      },
    }
  );

  return data;
};

const useLatestMovie = () => {
  const { api_key } = useMovieStore();

  const latestQuery = useQuery(
    ["latest", "movie"],
    () => fetchDetails(api_key),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { latestQuery };
};

export default useLatestMovie;
