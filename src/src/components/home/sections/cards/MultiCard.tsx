import { HStack } from "@chakra-ui/react";
import playButton from "../play-button2.png";
import { NavLink } from "react-router-dom";
import { HiPhotograph } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { Details } from "../../../../interfaces/MultiSearch";
interface Props {
  result: Details;
  category: string;
}
const Card = ({ result, category }: Props) => {
  const queryClient = useQueryClient();
  const prefetchSimilars = () => {
    queryClient.setQueryData(
      ["details", { category: category, id: result.id.toString() }],
      result
    );
  };
  function convertMinutesToHours(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  return (
    <>
      <div className="flex flex-col h-full  justify-between  rounded-[4px] overflow-hidden  ">
        <div className="relative group/play cursor-pointer posterimgcontainer h-full bg-[#080818]">
          <NavLink to={`/tmdb/${category}/${result?.id}`}>
            <div
              className="posterimg h-full min-h-[244.5px]"
              onMouseEnter={() => prefetchSimilars()}
            >
              {!result?.poster_path ? (
                <div className="h-full flex justify-center items-center animate-pulse bg-gray-900">
                  <HiPhotograph size={90} className="fill-gray-300" />
                </div>
              ) : (
                <>
                  <img
                    alt="card"
                    className="object-cover saturate-[1.3] w-full h-full text-[#080818] "
                    src={`https://image.tmdb.org/t/p/original/${result?.poster_path}`}
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
            {result?.name || result?.title}
          </h4>
          <div>
            <HStack spacing={2}>
              <div className="text-sm font-semibold py-[1px] px-[4px] rounded-md text-white bg-teal-500">
                HD
              </div>
              {result?.last_episode_to_air !== null || result.runtime ? (
                <>
                  <span className="text-sm font-medium text-gray-500">
                    {result.runtime
                      ? result.release_date?.slice(0, 4)
                      : result.last_episode_to_air
                      ? `S${result?.last_episode_to_air?.season_number}`
                      : null}
                  </span>
                  <span
                    className={`text-sm font-medium text-gray-500 ${
                      !result.last_episode_to_air &&
                      !result.runtime &&
                      "sr-only"
                    }`}
                  >
                    -
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {result?.last_episode_to_air?.episode_number ||
                      (result.runtime
                        ? convertMinutesToHours(result.runtime)
                        : null)}
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-gray-500">Soon</span>
              )}{" "}
              *
            </HStack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
