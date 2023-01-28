import { Button, useMediaQuery } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useDetails from "../../hooks/useDetails";
import { Details } from "../../interfaces/Details";

interface Props {
  movie: Details;
}
const PosterInicio = ({ movie }: Props) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  let firstPeriodIndex = movie?.overview.indexOf(".");

  function convertMinutesToHours(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-top bg-cover bg-no-repeat  h-[80vh]  w-full imgposter"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${
          isLargerThan500 ? movie.backdrop_path : movie.poster_path
        })`,
      }}
    >
      <div className="absolute z-[999] bottom-[10%] left-[11%] sm:left-[10%] lg:left-[8%] right-[10%]">
        <div className="flex flex-col justify-center items-start h-full w-full gap-4">
          <div className="space-y-2">
            <div
              className=" gap-3 hover:scale-105 duration-150 cursor-pointer"
              onClick={() => navigate(`/tmdb/movie/${movie.id}`)}
            >
              <h1 className=" md:text-5xl mr-3 inline-block sm:text-4xl align-middle text-2xl font-bold text-white">
                {movie.title}
              </h1>
              <div className="rounded-full  font-bold inline-block align-middle text-sm sm:text-base bg-yellow-500   px-2 sm:px-3">
                HD
              </div>
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-yellow-500">
                {Math.floor(movie.vote_average)}/10
              </span>

              <span>{convertMinutesToHours(movie.runtime)}</span>

              <span>{movie.release_date.substring(0, 4)}</span>
            </div>
          </div>
          <p className="text-gray-100 text-sm   sm:text-lg font-semibold font-sans">
            {movie.overview.substring(0, firstPeriodIndex)}...
          </p>
          <Button
            leftIcon={<FaPlay size={isLargerThan500 ? 20 : 15} />}
            size={"md"}
            rounded="sm"
            className="  flex mt-2"
            onClick={() => navigate(`/tmdb/movie/${movie.id}`)}
          >
            <span className="sm:text-xl text-lg font-semibold">Reproducir</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PosterInicio;
