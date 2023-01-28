import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Movies } from "../interfaces/Popular";

import { Details } from "../interfaces/Details";
let currentDate = new Date();
let year = currentDate.getFullYear();
let currentMonth = new Date().getMonth() + 1;
let nextMonth = new Date().getMonth() + 3;
let day = currentDate.getDate();
let date = `${year}-0${currentMonth}-${day}`;

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

const fetchMovies = async (key: string, type: string): Promise<Details[]> => {
  const { data } = await axios.get<Movies>(
    `https://api.themoviedb.org/3/discover/movie`,
    {
      params: {
        "release_date.gte": type === "upcoming" ? date.toString() : null,
        "release_date.lte":
          type === "upcoming"
            ? `2023-0${nextMonth}-01`
            : type === "now_playing"
            ? date.toString()
            : null,
        sort_by:
          type === "upcoming" || type === "now_playing"
            ? "release_date.desc"
            : "popularity.desc",
        with_release_type: "2|3",
        languague: "en-US",
        region: "US",

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

const useMovie = (type: string) => {
  const { api_key } = useMovieStore();

  const movieQuery = useQuery(
    ["movies", { type }],
    () => fetchMovies(api_key, type),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { movieQuery };
};

export default useMovie;
