import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Movies } from "../interfaces/Popular";
import { fetchDetails } from "./useDetails";
import { Details } from "../interfaces/Details";
import { sleep } from "../helpers/sleep";
let currentDate = new Date();
let year = currentDate.getFullYear();
let currentMonth = new Date().getMonth() + 1;
let nextMonth = new Date().getMonth() + 3;
let day = currentDate.getDate();
let date = `${year}-0${currentMonth}-${day}`;

export const fetchSimilarMovies = async (
  key: string,
  id: string
): Promise<Details[]> => {
  const { data } = await axios.get<Movies>(
    `https://api.themoviedb.org/3/movie/${id}/similar`,
    {
      params: {
        languague: "en-US",
        api_key: key,
      },
    }
  );

  const detailsArray = await data.results.map((movie) => {
    return fetchDetails(key, movie.id.toString(), "movie");
  });
  const result: Details[] = await Promise.all(detailsArray);

  return result;
};

const useSimilarMovies = (id: string) => {
  const { api_key } = useMovieStore();

  const similarMoviesQuery = useQuery(
    ["movies", "similars", "to", { id: id }],
    () => fetchSimilarMovies(api_key, id),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { similarMoviesQuery };
};

export default useSimilarMovies;
