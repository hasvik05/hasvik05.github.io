import {
  Button,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { FaPlay } from "react-icons/fa";

import { Collection } from "../../../../interfaces/Collection";
import { useMovieStore } from "../../../../store/store";

interface Props {
  data?: Collection;
}

const MobileReview = ({ data }: Props) => {
  const { convertToHours } = useMovieStore();
  return (
    <div className="block min-[870px]:hidden p-4">
      <div className="h-full bg-slate-900">
        <div className="flex flex-col justify-center p-4 gap-3">
          <div className="flex gap-2 justify-center items-center ">
            {" "}
            <h4 className=" text-white font-semibold text-xl">{`${data?.name}`}</h4>
          </div>
        </div>

        <div className="bg-slate-900 p-2 flex flex-col gap-1 text-white pb-4">
          <span className="text-xl font-semibold">Overview</span>
          <p className="text-base font-normal text-white/90">
            {data?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileReview;
