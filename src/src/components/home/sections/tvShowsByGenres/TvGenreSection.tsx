import { useMovieStore } from "../../../../store/store";
import { Spinner } from "@chakra-ui/react";

import { useState } from "react";
import TvShowsByGenre from "./TvShowsByGenre";

const GenreSection = () => {
  const { tvGenres } = useMovieStore();
  const [numberOfItems, setNumberOfItems] = useState(5); // state for our items
  return (
    <div className="p-6 flex flex-col gap-8 w-full">
      <div className="text-5xl text-teal-500 font-semibold ">TV Shows</div>

      {tvGenres.length > 0 ? (
        <div className={`flex flex-col gap-16 min-h-screen mb-4`}>
          {tvGenres.slice(0, numberOfItems).map((genre) => (
            <TvShowsByGenre key={genre.id} genre={genre} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full h-[100vh] items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
      <button
        onClick={() =>
          setNumberOfItems((prev) =>
            prev + 3 > tvGenres.length
              ? prev + tvGenres.length - prev
              : prev + 3
          )
        }
        className={`text-white -mt-1 font-semibold text-xl bg-teal-500 px-3 py-2 rounded-lg ${
          numberOfItems === tvGenres.length ? "hidden" : ""
        }`}
      >
        Load More
      </button>
    </div>
  );
};

export default GenreSection;
