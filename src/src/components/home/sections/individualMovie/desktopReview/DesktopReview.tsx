import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillStar, AiOutlineMenuUnfold } from "react-icons/ai";

import { FaPlay } from "react-icons/fa";

import { Details, Cast } from "../../../../../interfaces/Details";
import { useMovieStore } from "../../../../../store/store";
import IndividualCredits from "../IndividualCredits";
interface Props {
  data?: Details;
  credits: (Cast | undefined)[];
}
const DesktopReview = ({ data, credits }: Props) => {
  const { convertToHours } = useMovieStore();

  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  return (
    <div className=" px-5 py-4 flex flex-col gap-4 z-50 justify-center">
      <div className="flex flex-col gap-1">
        <div className="xl:text-4xl min-[830px]:text-3xl text-[26px]  font-bold text-white ">
          <h4 className="inline-block mr-2">{`${data?.title}`}</h4>

          <span className="text-gray-300 text-2xl align-bottom font-semibold inline-block">
            ({data?.release_date.substring(0, 4)})
          </span>
        </div>
        <div
          className={
            "text-sm flex gap-1 flex-col lg:flex-row lg:gap-2 font-semibold text-white"
          }
        >
          <span className="inline-block">{data?.release_date}</span>

          {data?.release_date && (
            <span className="sr-only lg:not-sr-only">-</span>
          )}
          <div className="flex gap-2">
            <ul>
              {data?.genres.map((genre, index) =>
                index === 0 ? (
                  <li className="inline-block" key={index}>
                    {genre.name}
                  </li>
                ) : (
                  <li className="inline-block" key={genre.id}>
                    , {genre.name}
                  </li>
                )
              )}
            </ul>
            {data?.genres && data.genres.length > 0 ? <span>-</span> : null}
            <span>
              {data && data.runtime !== 0
                ? convertToHours(data.runtime)
                : "unknown runtime"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-white items-center">
        <CircularProgress
          value={data ? Math.round(data?.vote_average) * 10 : 0}
          size="70px"
          color="cyan.500"
          className="hover:scale-110 duration-200 cursor-pointer"
        >
          <CircularProgressLabel
            fontSize="18px"
            className="text-white select-none font-semibold"
          >
            {data ? `${Math.round(data?.vote_average) * 10}%` : null}
          </CircularProgressLabel>
        </CircularProgress>
        <h4 className="font-semibold text-base">User Score</h4>

        <div className="flex gap-3 mx-4 items-center">
          <div className="p-2.5 cursor-pointer rounded-full bg-cyan-900 relative tooltip">
            <AiOutlineMenuUnfold size="20px" />
            <span className="tooltiptext bg-[#164e63] w-[110px] -ml-[55px]">
              Add to list
            </span>
          </div>
          <div className="p-2.5 cursor-pointer rounded-full bg-cyan-900 relative tooltip">
            <AiFillHeart size="20px" />
            <span className="tooltiptext bg-[#164e63] w-[130px] -ml-[65px]">
              Mark as favorite
            </span>
          </div>
          <div className="p-2.5 cursor-pointer rounded-full bg-cyan-900 relative tooltip">
            <AiFillStar size="20px" />
            <span className="tooltiptext bg-[#164e63] w-[60px] -ml-[30px]">
              Rate
            </span>
          </div>
          <Button
            leftIcon={
              <FaPlay
                size="16px"
                className="group-hover/boton:text-white/75 "
              />
            }
            size="md"
            _hover={{ bg: "transparent" }}
            rounded="sm"
            bg={"transparent "}
            className="group/boton -mx-1 "
          >
            <span className="text-lg font-semibold group-hover/boton:text-white/75  ">
              Play trailer
            </span>
          </Button>
        </div>
      </div>
      <div className="-mt-1 flex flex-col gap-1">
        {data?.tagline ? (
          <span className="text-base italic text-white/75">
            {data?.tagline}
          </span>
        ) : null}
        <span className="text-xl font-bold text-white">Overview</span>
        <p className="text-sm lg:text-base font-medium text-white/90">
          {data?.overview}
        </p>
      </div>
      <div className="grid grid-cols-3  gap-3">
        {credits
          ?.slice(0, isLargerThan1200 ? credits.length - 1 : 3)
          .map((credit, index) =>
            credit ? <IndividualCredits key={index} person={credit} /> : null
          )}
      </div>
    </div>
  );
};

export default DesktopReview;
