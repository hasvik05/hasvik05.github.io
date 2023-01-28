import { useMediaQuery } from "@chakra-ui/react";

import { Collection } from "../../../../interfaces/Collection";

import { useMovieStore } from "../../../../store/store";

interface Props {
  data?: Collection;
}
const DesktopReview = ({ data }: Props) => {
  const { convertToHours } = useMovieStore();

  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  return (
    <div className=" px-5 py-4 flex flex-col gap-7 z-50 justify-center">
      <div className="flex flex-col gap-1">
        <div className="xl:text-4xl min-[830px]:text-3xl text-[26px]  font-bold text-white ">
          <h4 className="inline-block mr-2">{`${data?.name}`}</h4>
        </div>
      </div>
      <div className="flex gap-2 text-white items-center">
        <div className="-mt-1 flex flex-col gap-1">
          <span className="text-xl font-bold text-white">Overview</span>
          <p className="text-sm lg:text-base font-medium text-white/75">
            {data?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesktopReview;
