import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Series } from "../interfaces/Series";
import { TvDetails } from "../interfaces/TvDetails";

const fetchDetails = async (
  key: string,
  id: string,
  category: string
): Promise<TvDetails> => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${category}/${id}`,
    {
      params: {
        api_key: key,
        append_to_response: "credits",
        region: "US",
        language: "en-US",
      },
    }
  );

  return data;
};
const fetchMovies = async (key: string, type: string): Promise<TvDetails[]> => {
  const { data } = await axios.get<Series>(
    `https://api.themoviedb.org/3/discover/tv`,
    {
      params: {
        api_key: key,
        with_original_language: type === "popular" ? "en" : null,
      },
    }
  );
  const detailsArray = await data.results.map((movie) => {
    return fetchDetails(key, movie.id.toString(), "tv");
  });
  const result: TvDetails[] = await Promise.all(detailsArray);
  return result;
};

const useTVShows = (type: string) => {
  const { api_key } = useMovieStore();

  const TVQuery = useQuery(
    ["tvShows", { type }],
    () => fetchMovies(api_key, type),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { TVQuery };
};

export default useTVShows;
