import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Series } from "../interfaces/Series";
import { fetchDetails } from "./useTvDetails";
import { TvDetails } from "../interfaces/TvDetails";

let currentDate = new Date();
let year = currentDate.getFullYear();
let currentMonth = new Date().getMonth() + 1;
let nextMonth = new Date().getMonth() + 3;
let day = currentDate.getDate();
let date = `${year}-0${currentMonth}-${day}`;

export const fetchSimilarSeries = async (
  key: string,
  id: string
): Promise<TvDetails[]> => {
  const { data } = await axios.get<Series>(
    `https://api.themoviedb.org/3/tv/${id}/similar`,
    {
      params: {
        languague: "en-US",
        api_key: key,
      },
    }
  );

  const detailsArray = await data.results.map((serie) => {
    return fetchDetails(key, serie.id.toString(), "tv");
  });
  const result: TvDetails[] = await Promise.all(detailsArray);

  return result;
};

const useSimilarTvShows = (id: string) => {
  const { api_key } = useMovieStore();

  const similarTvQuery = useQuery(
    ["tvShows", "similars", "to", { id: id }],
    () => fetchSimilarSeries(api_key, id),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { similarTvQuery };
};

export default useSimilarTvShows;
