import React from "react";
import { Link } from "react-router-dom";
import { Result } from "../../../../interfaces/Popular";
import placeholder from "../placeholder.jpg";
interface Props {
  movie: Result;
}
const CollectionCard = ({ movie }: Props) => {
  return (
    <Link to={`/tmdb/movie/${movie.id}`}>
      <div className="flex w-full overflow-clip h-[140px] bg-slate-800  rounded-lg items-center hover:bg-black/30 cursor-pointer">
        <img
          alt="card"
          className="object-cover saturate-[1.3] max-w-[93.33px] h-full text-[#080818] "
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : placeholder
          }
        />{" "}
        <div className="p-3 grid grid-cols-1 gap-2 ">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-white font-semibold text-lg truncate">
              {movie.title}
            </h4>
            <span className="text-base font-semibod text-white/75 truncate">
              {movie.release_date}
            </span>
          </div>
          <p className="truncate text-white/90 text-base font-semibold">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
