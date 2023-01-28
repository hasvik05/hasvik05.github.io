import useDetails from "../../../../hooks/useDetails";
import { useParams } from "react-router-dom";
import { Spinner, useMediaQuery } from "@chakra-ui/react";
import placeholder from "../placeholder.jpg";
import CastCard from "../cards/CastCard";
import MobileReview from "./mobileReview/MobileReview";
import DesktopReview from "./desktopReview/DesktopReview";
import Similar from "./Similars";
import CollectionOverview from "./CollectionOverview";
const Movie = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { detailsQuery } = useDetails(id!, "movie");

  const [isLargerThan870] = useMediaQuery("(min-width: 870px)");

  const credits = [
    detailsQuery.data?.credits.crew.find((crew) => crew.job === "Director"),
    detailsQuery.data?.credits.crew.find((crew) => crew.job === "Screenplay"),

    detailsQuery.data?.credits.crew.find((crew) => crew.job === "Producer"),

    detailsQuery.data?.credits.crew.find(
      (crew) => crew.job === "Original Music Composer"
    ),

    detailsQuery.data?.credits.crew.find(
      (crew) => crew.job === "Director of Photography"
    ),
  ];

  return (
    <>
      <div className="w-full">
        {detailsQuery.isLoading ? (
          <div className="flex justify-center  w-full  items-center lg:h-[80vh] sm:h-[60vh]  h-[30vh]">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <div className="">
            <div
              className={`relative  bg-cover bg-top bg-no-repeat  overflow-hidden lg:h-[80vh]  min-[870px]:h-[80vh] sm:h-[40vh] h-[30vh] ${
                isLargerThan870 ? "poster" : "mobile_backdrop"
              }`}
              style={{
                backgroundImage: detailsQuery.data?.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${detailsQuery.data?.backdrop_path})`
                  : `url(${placeholder})`,
              }}
            >
              <div
                className={`h-full ${
                  isLargerThan870 ? "details_backdrop" : ""
                }`}
              >
                <div className="h-full lg:px-9 px-4 w-full flex items-center gap-4 min-[870px]:-py-6 py-3">
                  {detailsQuery.data?.poster_path ? (
                    <img
                      className="rounded-md  h-full object-cover z-50"
                      src={`https://image.tmdb.org/t/p/original/${detailsQuery.data?.poster_path}`}
                    />
                  ) : (
                    <img
                      className="rounded-md h-full object-cover z-50 lg:max-w-[350px] max-w-[200px] animate-pulse"
                      src={placeholder}
                    />
                  )}
                  {isLargerThan870 ? (
                    <DesktopReview data={detailsQuery.data} credits={credits} />
                  ) : null}
                </div>
              </div>
            </div>
            <MobileReview data={detailsQuery.data} credits={credits} />

            <div className="flex lg:px-7 px-4 flex-col gap-9 py-4 md:mt-4 mt-0 ">
              {detailsQuery.data?.credits.cast &&
              detailsQuery.data.credits.cast.length > 0 ? (
                <div className="flex flex-col gap-4 w-full">
                  <>
                    <h4 className="text-white/75 text-2xl font-semibold">
                      Top Billed Cast
                    </h4>
                    <div className="overflow-x-scroll flex gap-4 flex-nowrap pb-4">
                      {detailsQuery.data?.credits.cast
                        .slice(0, 10)
                        .map((cast) => (
                          <CastCard key={cast.cast_id} cast={cast} />
                        ))}
                    </div>
                  </>
                </div>
              ) : null}
              {detailsQuery.data?.belongs_to_collection &&
              detailsQuery.data?.belongs_to_collection.backdrop_path ? (
                <CollectionOverview
                  collection_id={detailsQuery.data?.belongs_to_collection.id.toString()}
                  backdrop_path={
                    detailsQuery.data?.belongs_to_collection.backdrop_path
                  }
                />
              ) : null}
              <Similar />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
