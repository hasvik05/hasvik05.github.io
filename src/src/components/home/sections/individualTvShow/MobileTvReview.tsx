import {
  Button,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { FaPlay } from "react-icons/fa";
import { TvDetails, Cast } from "../../../../interfaces/TvDetails";
import { useMovieStore } from "../../../../store/store";
interface Props {
  data?: TvDetails;
  credits: (Cast | undefined)[];
}

const MobileReview = ({ data, credits }: Props) => {
  const { convertToHours } = useMovieStore();
  return (
    <div className="block min-[870px]:hidden p-4">
      <div className="h-full bg-slate-900">
        <div className="flex flex-col justify-center p-4 gap-3">
          <div className="flex gap-2 justify-center items-center ">
            {" "}
            <h4 className=" text-white font-semibold text-xl">{`${data?.name}`}</h4>
            <span className="text-gray-300 text-base font-semibold ">
              ({data?.first_air_date.substring(0, 4)})
            </span>
          </div>
          <div className="grid grid-cols-3 items-center">
            <div className="flex gap-2 justify-self-start text-white items-center">
              <CircularProgress
                value={data ? Math.round(data.vote_average) * 10 : 0}
                size="50px"
                color="cyan.500"
                className="hover:scale-110 duration-200 cursor-pointer"
              >
                <CircularProgressLabel
                  fontSize="13px"
                  className="text-white select-none font-bold tracking-wide"
                >
                  {data ? `${Math.round(data.vote_average) * 10}` : null}
                  <span className="text-[9px] font-light align-top">%</span>
                </CircularProgressLabel>
              </CircularProgress>
              <h4 className="font-semibold text-base whitespace-nowrap">
                User Score
              </h4>
            </div>
            <div className="w-[1px] justify-self-center h-[40px] bg-gray-500"></div>
            <Button
              leftIcon={
                <FaPlay
                  size="14px"
                  className="group-hover/boton:text-white/75 text-white"
                />
              }
              size="md"
              _hover={{ bg: "transparent" }}
              rounded="sm"
              bg={"transparent "}
              className="group/boton -mx-1 justify-self-end"
            >
              <span className="text-base font-medium text-white group-hover/boton:text-white/75  ">
                Play trailer
              </span>
            </Button>
          </div>
        </div>
        <div className="w-full   bg-[#0d0d20] p-2 justify-center flex flex-col items-center">
          <div className="flex gap-2    justify-center text-white">
            <span className="inline-block">{data?.first_air_date}</span>
            <span className=" ">-</span>

            <span>
              {" "}
              {`${data?.number_of_seasons} ${
                data?.number_of_seasons === 1 ? "season" : "seasons"
              }`}
            </span>
          </div>
          <ul className=" text-white font-normal text-center">
            {data?.genres.map((genre, index) =>
              index === data.genres.length - 1 ? (
                <li key={genre.id} className="inline-block">
                  {genre.name}{" "}
                </li>
              ) : (
                <li key={genre.id} className="inline-block">
                  {genre.name},
                </li>
              )
            )}
          </ul>
        </div>
        <div className="bg-slate-900 p-4 flex flex-col gap-1 text-white">
          <h4 className="text-white/75 italic font-normal mb-[2px]">
            {data?.tagline}
          </h4>
          <span className="text-xl font-semibold">Overview</span>
          <p className="text-base font-normal text-white/90">
            {data?.overview}
          </p>

          <div className="mt-6 h-full grid grid-cols-2 gap-5 mx-auto  min-[600px]:grid-cols-4">
            {credits?.map((credit, index) =>
              credit ? (
                <div className="flex flex-col " key={credit.id}>
                  <span className="text-[15px] font-semibold text-white">
                    {credit?.job}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {credit?.name}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileReview;
