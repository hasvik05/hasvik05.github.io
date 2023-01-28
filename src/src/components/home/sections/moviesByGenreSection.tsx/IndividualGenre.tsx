import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Card from "../cards/Card";
import useInfiniteMovie from "../../../../hooks/useInfiniteMoviesByGenre";
import { useEffect, useState } from "react";
import { useMovieStore } from "../../../../store/store";
const IndividualGenre = () => {
  const { id } = useParams<{ id: string }>();
  const [idArray, setIdArray] = useState<string[]>([]);
  useEffect(() => {
    setIdArray([id!]);
  }, [id]);
  const { infiniteMovieQuery } = useInfiniteMovie(idArray);
  const { data, isLoading } = infiniteMovieQuery;
  const { genres } = useMovieStore();
  const genre = genres.find((genre) => genre.id.toString() === id);
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
            {genre?.name} Movies
          </h4>
          <div className="similar gap-2 sm:gap-3">
            {data?.pages.flat().map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
          <button
            className={`bg-teal-500 font-semibold text-lg py-3 rounded-lg text-white cursor-pointer mt-2 ${
              infiniteMovieQuery.isFetchingNextPage ? "bg-teal-700" : ""
            }`}
            disabled={
              !infiniteMovieQuery.hasNextPage ||
              infiniteMovieQuery.isFetchingNextPage
            }
            onClick={() => infiniteMovieQuery.fetchNextPage()}
          >
            {infiniteMovieQuery.isFetchingNextPage
              ? "Loading..."
              : "Load More..."}
          </button>
        </div>
      )}
    </>
  );
};

export default IndividualGenre;
