import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";
import { Series } from "../interfaces/Series";

import { TvDetails } from "../interfaces/TvDetails";

interface Props {
  genres: string[];
}
interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}
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

const fetchMovies = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<TvDetails[]> => {
  const [, , args] = queryKey;
  const { genres } = args as Props;
  const key = "c600e7ffd2db33ee7edc1e6e3d798f17";
  const { data } = await axios.get<Series>(
    `https://api.themoviedb.org/3/discover/tv`,
    {
      params: {
        languague: "en-US",
        api_key: key,
        sort_by: "popularity.desc",
        page: pageParam,
        with_genres: genres.join(","),
      },
    }
  );
  const detailsArray = await data.results.map((movie) => {
    return fetchDetails(key, movie.id.toString(), "tv");
  });
  const result: TvDetails[] = await Promise.all(detailsArray);
  return result;
};

const useInfiniteTvShow = (genres: string[]) => {
  const { api_key } = useMovieStore();

  const infiniteTvQuery = useInfiniteQuery(
    ["tvshows", "infinite", { genres }],
    (data) => fetchMovies(data),
    {
      staleTime: 1000 * 60 * 60 * 2,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;

        return pages.length + 1;
      },
    }
  );

  return { infiniteTvQuery };
};

export default useInfiniteTvShow;
