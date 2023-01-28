import useMovie from "../../hooks/useMovies";

import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PosterInicio from "./PosterInicio";
import { Spinner } from "@chakra-ui/react";
import Trending from "./sections/Trending";
import MoviesByType from "./sections/MoviesByType";
import SeriesByType from "./sections/SeriesByType";

const Home = () => {
  const { movieQuery } = useMovie("popular");

  return (
    <>
      {movieQuery.isLoading ? (
        <div className="flex justify-center sm:h-[80vh] w-full h-[90vh] items-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={{ clickable: true }}
          >
            {movieQuery.data?.slice(0, 4).map((movie) => (
              <SwiperSlide className="w-screen poster" key={movie.id}>
                <PosterInicio movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div
        className={`p-6 flex flex-col gap-9 min-h-screen  ${
          movieQuery.isLoading ? "hidden" : ""
        }`}
      >
        {!movieQuery.isLoading && <Trending movies={movieQuery.data} />}
        <SeriesByType type="on_the_air" name="Latest TV Shows" category="tv" />
        <MoviesByType
          type="now_playing"
          name="Latest Movies"
          category="movie"
        />
        <MoviesByType type="upcoming" name="Coming Soon" category="movie" />
      </div>
    </>
  );
};

export default Home;
