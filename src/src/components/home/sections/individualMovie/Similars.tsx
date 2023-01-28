import useSimilarMovies from "../../../../hooks/useSimilarMovies";
import { useParams } from "react-router-dom";
import Card from "../cards/Card";
import { Spinner } from "@chakra-ui/react";
const Similars = () => {
  const { id } = useParams<{ id: string }>();
  const { similarMoviesQuery } = useSimilarMovies(id!);
  const { data, isLoading } = similarMoviesQuery;

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
            Similar Movies
          </h4>
          <div className="mt-4 h-full gap-3 similar ">
            {data?.map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Similars;
