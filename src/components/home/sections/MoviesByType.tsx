import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper";
import Card from "./cards/Card";

import useMovie from "../../../hooks/useMovies";

import { useMovieStore } from "../../../store/store";
import { useEffect } from "react";

interface Props {
  type: string;
  name: string;
  category: string;
}

const MoviesByType = ({ type, name }: Props) => {
  const { changeStatus } = useMovieStore();
  const { movieQuery } = useMovie(type);
  const { data, isLoading } = movieQuery;
  /*   const settings = {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerGroup: 1,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      800: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1200: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
    },
  }; */
  /* 
  if (type === "upcoming" && !isLoading) {
    changeStatus("success");
    
  } */
  const settings = {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerGroup: 1,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      450: {
        slidesPerView: 2.3,
        slidesPerGroup: 2,
      },
      // when window width is >= 480px
      500: {
        slidesPerView: 2.7,
        slidesPerGroup: 2,
      },
      // when window width is >= 640px
      600: {
        slidesPerView: 3.3,
        slidesPerGroup: 3,
      },
      680: {
        slidesPerView: 3.7,
        slidesPerGroup: 3,
      },
      840: {
        slidesPerView: 4.7,
        slidesPerGroup: 4,
      },
      1100: {
        slidesPerView: 5.7,
        slidesPerGroup: 5,
      },
      1200: {
        slidesPerView: 6.3,
        slidesPerGroup: 6,
      },
    },
  };

  useEffect(() => {
    if (type === "upcoming" && isLoading) {
      changeStatus("loading");
    } else if (type === "upcoming" && !isLoading) {
      changeStatus("success");
    }
  }, [isLoading]);
  if (isLoading) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 items-baseline">
        <h3 className="text-3xl  font-semibold text-teal-500">{name}</h3>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          {...settings}
          className="cards"
          navigation
          id="container"
        >
          {data?.map((movie, index) => (
            <SwiperSlide className="h-full " key={movie.id}>
              <Card movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesByType;
