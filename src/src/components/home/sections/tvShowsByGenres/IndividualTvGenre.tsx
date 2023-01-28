import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import TvCard from "../cards/TvCard";

import { useEffect, useState } from "react";
import useInfiniteTvShow from "../../../../hooks/useInfiniteTvShows";
import { useMovieStore } from "../../../../store/store";
const IndividualGenre = () => {
  const { id } = useParams<{ id: string }>();
  const [idArray, setIdArray] = useState<string[]>([]);
  useEffect(() => {
    setIdArray([id!]);
  }, []);
  const { infiniteTvQuery } = useInfiniteTvShow(idArray);
  const { data, isLoading } = infiniteTvQuery;
  const { tvGenres } = useMovieStore();
  const genre = tvGenres.find((genre) => genre.id.toString() === id);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center ] w-full h-[100vh] items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className="min-h-screen p-6 lg:p-8 mt-2 flex flex-col gap-6 ">
          <h4 className="text-3xl font-semibold text-white/75 ">
            {genre?.name} Tv Shows
          </h4>
          <div className="similar gap-2 sm:gap-3">
            {data?.pages.flat().map((serie) => (
              <TvCard serie={serie} key={serie.id} />
            ))}
          </div>
          <button
            className={`bg-teal-500 font-semibold text-lg py-3 rounded-lg text-white cursor-pointer mt-2 ${
              infiniteTvQuery.isFetchingNextPage ? "bg-teal-700" : ""
            }`}
            disabled={
              !infiniteTvQuery.hasNextPage || infiniteTvQuery.isFetchingNextPage
            }
            onClick={() => infiniteTvQuery.fetchNextPage()}
          >
            {infiniteTvQuery.isFetchingNextPage ? "Loading..." : "Load More..."}
          </button>
        </div>
      )}
    </>
  );
};

export default IndividualGenre;
