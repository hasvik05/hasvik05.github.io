import { HStack } from "@chakra-ui/react";
import playButton from "../play-button2.png";
import { NavLink } from "react-router-dom";

import { HiPhotograph } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { fetchSimilarMovies } from "../../../../hooks/useSimilarMovies";
import { useMovieStore } from "../../../../store/store";
import { Details } from "../../../../interfaces/Details";
interface Props {
  movie: Details;
}
const Card = ({ movie }: Props) => {
  const queryClient = useQueryClient();
  function convertMinutesToHours(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  const prefetchSimilars = () => {
    queryClient.setQueryData(
      ["details", { category: "movie", id: movie.id.toString() }],
      movie
    );
    /* queryClient.prefetchQuery(
      ["movies", "similars", "to", { id: movie.id.toString() }],
      () => fetchSimilarMovies(api_key, movie.id.toString()),
      {
        staleTime: 1000 * 60 * 60 * 24,
      }
    ); */
  };
  return (
    <>
      <div className="flex flex-col h-full  justify-between  rounded-[4px] overflow-hidden select-none ">
        <div className="relative group/play cursor-pointer posterimgcontainer h-full bg-[#080818]">
          <NavLink to={`/tmdb/movie/${movie.id}`}>
            <div
              className="posterimg h-full min-h-[244.5px]"
              onMouseEnter={() => prefetchSimilars()}
            >
              {!movie.poster_path ? (
                <div className="h-full flex justify-center items-center animate-pulse bg-gray-900">
                  <HiPhotograph size={90} className="fill-gray-300" />
                </div>
              ) : (
                <>
                  <img
                    alt="card"
                    className="object-cover saturate-[1.1] w-full h-full text-[#080818] "
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />{" "}
                  <img
                    className="absolute saturate-[0.45] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] group-hover/play:opacity-100 opacity-0 duration-500"
                    src={playButton}
                  />
                </>
              )}
            </div>
          </NavLink>
        </div>
        <div className="px-2 py-[10px] flex flex-col bg-white">
          <h4 className="font-semibold text-lg text-black truncate">
            {movie.title}
          </h4>
          <div>
            <HStack spacing={2}>
              <div className="text-sm font-semibold  px-[4px] rounded-md text-white bg-teal-500">
                HD
              </div>
              <span className="text-sm font-medium text-gray-500">
                {movie.release_date.slice(0, 4)}
              </span>
              <span className="text-sm font-medium text-gray-500">-</span>
              <span className="text-sm font-medium text-gray-500">
                {convertMinutesToHours(movie.runtime)}
              </span>
            </HStack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
