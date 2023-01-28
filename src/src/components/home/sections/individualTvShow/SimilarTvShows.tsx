import { useParams } from "react-router-dom";

import { Spinner } from "@chakra-ui/react";
import TvCard from "../cards/TvCard";
import useSimilarTvShows from "../../../../hooks/useSimilarTvShows";

const SimilarsTv = () => {
  const { id } = useParams<{ id: string }>();
  const { similarTvQuery } = useSimilarTvShows(id!);
  const { data, isLoading } = similarTvQuery;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center  w-full h-screen items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : data?.length && data.length > 0 ? (
        <div className=" w-full md:p-2 flex flex-col">
          {" "}
          <h4 className="text-white/75  text-3xl font-semibold  ">
            Similar Tv Shows
          </h4>
          <div className="mt-4 h-full gap-3 similar ">
            {data?.map((serie) => (
              <TvCard serie={serie} key={serie.id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SimilarsTv;
