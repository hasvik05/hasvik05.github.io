import React from "react";
import { Details } from "../../../../interfaces/MultiSearch";
import { useMovieStore } from "../../../../store/store";
import placeholder from "../placeholder.jpg";
import { Link } from "react-router-dom";
interface Props {
  result: Details;
}
const SearchCard = ({ result }: Props) => {
  const { convertToHours } = useMovieStore();
  return (
    <Link
      to={`/tmdb/${result.seasons ? "tv" : "movie"}/${result.id}`}
      className="flex gap-3 p-2 w-full max-h-[100px] hover:opacity-60 transition-opacity duration-200 ease-in-out"
    >
      <img
        className="object-cover object-center h-full w-[56px] min-h-[83px]"
        src={
          result.poster_path
            ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
            : placeholder
        }
      />
      <div className="flex flex-col gap-1 justify-center h-full overflow-hidden mt-2">
        <h4 className="font-semibold text-lg text-white truncate">
          {result.name || result.title}
        </h4>
        <div className="flex gap-1 text-white/75 text-base font-medium">
          <span>
            {result.seasons
              ? `SS ${result.number_of_seasons}`
              : result.release_date?.substring(0, 4) || null}
          </span>
          <span
            className={`${
              result.runtime === 0 ||
              !result.release_date ||
              !result.number_of_episodes
                ? "hidden"
                : "block"
            }`}
          >
            -
          </span>
          <span>
            {result.runtime
              ? convertToHours(result.runtime)
              : result.number_of_episodes}
          </span>
          <span>-</span>
          <span>{result.seasons ? "Tv" : "Movie"}</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
