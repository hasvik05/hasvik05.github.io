import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Series } from "../interfaces/Series";

import { Genre } from "../interfaces/Details";
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
        language: "en-US",
        append_to_response: "credits",
      },
    }
  );

  return data;
};

const fetchSeries = async (
  key: string,
  genre: string
): Promise<TvDetails[]> => {
  const { data } = await axios.get<Series>(
    `https://api.themoviedb.org/3/discover/tv`,
    {
      params: {
        api_key: key,
        with_genres: genre,
        languague: "en-US",
      },
    }
  );
  const detailsArray = await data.results.map((movie) => {
    return fetchDetails(key, movie.id.toString(), "tv");
  });
  const result: TvDetails[] = await Promise.all(detailsArray);
  return result;
};

const useTvShowByGenre = (genre: Genre) => {
  const { api_key } = useMovieStore();
  const genreName = genre.name;
  const tvGenreQuery = useQuery(
    ["tvshows", { genreName }],
    () => fetchSeries(api_key, genre.id.toString()),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { tvGenreQuery };
};

export default useTvShowByGenre;
