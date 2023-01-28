import { useParams } from "react-router-dom";
import useTvDetails from "../../../../hooks/useTvDetails";
import SimilarsTv from "./SimilarTvShows";
import { Spinner, useMediaQuery } from "@chakra-ui/react";
import placeholder from "../placeholder.jpg";
import CastCard from "../cards/CastCard";
import DesktopTvReview from "./DesktopTvReview";
import CollectionOverview from "../individualMovie/CollectionOverview";
import MobileTvReview from "./MobileTvReview";

const Tv = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { tvDetailsQuery } = useTvDetails(id!, "tv");

  const [isLargerThan870] = useMediaQuery("(min-width: 870px)");

  const credits = [
    tvDetailsQuery.data?.credits.crew.find((crew) => crew.job === "Director"),
    tvDetailsQuery.data?.credits.crew.find((crew) => crew.job === "Screenplay"),

    tvDetailsQuery.data?.credits.crew.find((crew) => crew.job === "Producer"),

    tvDetailsQuery.data?.credits.crew.find(
      (crew) => crew.job === "Original Music Composer"
    ),

    tvDetailsQuery.data?.credits.crew.find(
      (crew) => crew.job === "Director of Photography"
    ),
  ];
  return (
    <>
      {" "}
      <div className="w-full ">
        {tvDetailsQuery.isLoading ? (
          <div className="flex justify-center  w-full  items-center  h-[100vh]">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <>
            <div
              className={`relative bg-cover bg-top bg-no-repeat w-full  overflow-hidden lg:h-[80vh]  min-[870px]:h-[80vh] sm:h-[40vh] h-[30vh] ${
                isLargerThan870 ? "poster" : "mobile_backdrop"
              }`}
              style={{
                backgroundImage: tvDetailsQuery.data?.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${tvDetailsQuery.data?.backdrop_path})`
                  : `url(${placeholder})`,
              }}
            >
              <div
                className={`h-full ${
                  isLargerThan870 ? "details_backdrop" : ""
                }`}
              >
                <div className="h-full lg:px-9 px-4 flex items-center gap-4 min-[870px]-py-6 py-3 ">
                  {tvDetailsQuery.data?.poster_path ? (
                    <img
                      className="rounded-md  h-full object-cover z-50"
                      src={`https://image.tmdb.org/t/p/original/${tvDetailsQuery.data?.poster_path}`}
                    />
                  ) : (
                    <img
                      className="rounded-md h-full object-cover z-50 lg:max-w-[350px] max-w-[200px] animate-pulse"
                      src={placeholder}
                    />
                  )}
                  {isLargerThan870 ? (
                    <DesktopTvReview
                      data={tvDetailsQuery.data}
                      credits={credits}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <MobileTvReview data={tvDetailsQuery.data} credits={credits} />

            <div className="flex lg:px-7 px-4 flex-col gap-9 p-4 md:mt-4 mt-0 ">
              <div className="flex flex-col gap-4 w-full">
                <>
                  {tvDetailsQuery.data?.credits.cast.length &&
                  tvDetailsQuery.data.credits.cast.length > 0 ? (
                    <>
                      <h4 className="text-white/75 text-2xl font-semibold">
                        Top Billed Cast
                      </h4>
                      <div className="overflow-x-scroll flex gap-4 flex-nowrap pb-4">
                        {tvDetailsQuery.data?.credits.cast
                          .slice(0, 10)
                          .map((cast) => (
                            <CastCard key={cast.id} cast={cast} />
                          ))}
                      </div>
                    </>
                  ) : null}
                </>
              </div>
              {/*    {tvDetailsQuery.data?.belongs_to_collection && (
            <CollectionOverview
              collection_id={tvDetailsQuery.data?.belongs_to_collection.id.toString()}
              backdrop_path={
                tvDetailsQuery.data?.belongs_to_collection.backdrop_path
              }
            />
          )} */}
              <SimilarsTv />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Tv;
