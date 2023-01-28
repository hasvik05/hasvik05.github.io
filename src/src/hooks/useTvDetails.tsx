import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";

import { TvDetails } from "../interfaces/TvDetails";

export const fetchDetails = async (
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
        region: "US",
        append_to_response: "credits",
      },
    }
  );

  return data;
};

const useTvDetails = (id: string, category: string) => {
  const { api_key } = useMovieStore();

  const tvDetailsQuery = useQuery(
    ["details", { category, id }],
    () => fetchDetails(api_key, id, category),
    {
      staleTime: 1000 * 60 * 60 * 2,
      enabled: !!id,
    }
  );

  return { tvDetailsQuery };
};

export default useTvDetails;
