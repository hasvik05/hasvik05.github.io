import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useSearch from "../../../../hooks/useSearch";

import MultiCard from "../cards/MultiCard";
const SearchSection = () => {
  const { name } = useParams<{ name: string }>();
  const { searchQuery } = useSearch(name!);
  const { data, isLoading } = searchQuery;
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center ] w-full h-[100vh] items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className="min-h-screen p-6 lg:p-8 mt-2 flex flex-col gap-6 ">
          <h4 className="text-3xl font-semibold text-white/75 ">
            Search results for "{name}"
          </h4>
          <div className=" similar gap-2 sm:gap-3">
            {data?.map((item) => (
              <MultiCard
                result={item}
                category={item.seasons ? "tv" : "movie"}
                key={item.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSection;
