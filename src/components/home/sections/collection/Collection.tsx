import useDetails from "../../../../hooks/useDetails";
import { useParams } from "react-router-dom";
import { Spinner, useMediaQuery } from "@chakra-ui/react";
import placeholder from "../placeholder.jpg";
import CastCard from "../cards/CastCard";
import MobileReview from "./MobileCollectionReview";
import DesktopCollectionReview from "./DesktopCollectionReview";
import useCollection from "../../../../hooks/useCollection";
import MobileCollectionReview from "./MobileCollectionReview";
import CollectionCard from "./CollectionCard";
const CollectionOverview = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { collectionQuery } = useCollection(id!);

  const [isLargerThan870] = useMediaQuery("(min-width: 870px)");

  return (
    <>
      <div className="w-full">
        {collectionQuery.isLoading ? (
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
                backgroundImage: collectionQuery.data?.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${collectionQuery.data?.backdrop_path})`
                  : `url(${placeholder})`,
              }}
            >
              <div
                className={`h-full ${
                  isLargerThan870 ? "details_backdrop" : ""
                }`}
              >
                <div className="h-full lg:px-9 px-4 w-full flex items-center gap-4 min-[870px]:-py-6 py-3">
                  {collectionQuery.data?.poster_path ? (
                    <img
                      className="rounded-md  h-full object-cover z-50"
                      src={`https://image.tmdb.org/t/p/original/${collectionQuery.data?.poster_path}`}
                    />
                  ) : (
                    <img
                      className="rounded-md h-full object-cover z-50 lg:max-w-[350px] max-w-[200px] animate-pulse"
                      src={placeholder}
                    />
                  )}
                  {isLargerThan870 ? (
                    <DesktopCollectionReview data={collectionQuery.data} />
                  ) : null}
                </div>
              </div>
            </div>
            <MobileCollectionReview data={collectionQuery.data} />
          </div>
        )}
        <div className="flex gap-4 p-7 flex-col ">
          <span className="text-white font-semibold text-3xl">
            {collectionQuery.data?.parts.length === 1
              ? `${collectionQuery.data.parts.length} Movie`
              : `${collectionQuery.data?.parts.length} Movies`}
          </span>
          {collectionQuery.data?.parts.map((movie, index) => (
            <CollectionCard movie={movie} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionOverview;
