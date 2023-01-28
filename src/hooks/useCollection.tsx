import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMovieStore } from "../store/store";

import { Collection } from "../interfaces/Collection";
const fetchCollection = async (
  key: string,
  id?: string
): Promise<Collection> => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/collection/${id}`,
    {
      params: {
        api_key: key,
        language: "en-US",
      },
    }
  );

  return data;
};

const useCollection = (collection_id: string) => {
  const { api_key } = useMovieStore();

  const collectionQuery = useQuery(
    ["Collection", { collection_id }],
    () => fetchCollection(api_key, collection_id),
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );

  return { collectionQuery };
};

export default useCollection;
