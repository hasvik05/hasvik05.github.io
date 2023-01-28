import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Movies } from "../interfaces/Popular";

import { Details, Genre } from "../interfaces/Details";

const fetchDetails = async (
  key: string,
  id: string,
  category: string
): Promise<Details> => {
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

const fetchMovies = async (key: string, genre: string): Promise<Details[]> => {
  const { data } = await axios.get<Movies>(
    `https://api.themoviedb.org/3/discover/movie`,
    {
      params: {
        api_key: key,
        with_genres: genre,
        languague: "en-US",
      },
    }
  );
  const detailsArray = await data.results.map((movie) => {
    return fetchDetails(key, movie.id.toString(), "movie");
  });
  const result: Details[] = await Promise.all(detailsArray);
  return result;
};

const useMovieByGenre = (genre: Genre) => {
  const { api_key } = useMovieStore();
  const genreName = genre.name;
  const movieGenreQuery = useQuery(
    ["movies", { genreName }],
    () => fetchMovies(api_key, genre.id.toString()),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { movieGenreQuery };
};

export default useMovieByGenre;
