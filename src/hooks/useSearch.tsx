import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";

import { MultiSearchResults, Details, Result } from "../interfaces/MultiSearch";
let currentDate = new Date();
let year = currentDate.getFullYear();
let currentMonth = new Date().getMonth() + 1;
let nextMonth = new Date().getMonth() + 3;
let day = currentDate.getDate();
let date = `${year}-0${currentMonth}-${day}`;

export const fetchDetails = async (
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

const fetchSearch = async (name: string, key: string): Promise<Details[]> => {
  if (!name) return Promise.resolve([]);
  const { data } = await axios.get<MultiSearchResults>(
    `https://api.themoviedb.org/3/search/multi`,
    {
      params: {
        api_key: key,
        query: name,
        languague: "en-US",
        region: "US",
      },
    }
  );
  const detailsArray = await data.results.map((movie: Result) => {
    return fetchDetails(key, movie.id.toString(), movie.media_type);
  });
  const result: Details[] = await Promise.all(detailsArray);
  return result;
};

const useSearch = (name: string) => {
  const { api_key } = useMovieStore();

  const searchQuery = useQuery(
    ["search", { name }],
    () => fetchSearch(name, api_key),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { searchQuery };
};

export default useSearch;
