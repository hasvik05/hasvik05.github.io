import { Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y, Lazy } from "swiper";
import Card from "./cards/Card";
import "swiper/css/parallax";

import TvCard from "./cards/TvCard";

import useTVShows from "../../../hooks/useTvShows";
import { Details } from "../../../interfaces/Details";

interface Props {
  movies?: Details[];
}

const Trending = ({ movies }: Props) => {
  const [movie, setMovie] = useState<boolean>(true);
  const { TVQuery } = useTVShows("popular");
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

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <h3 className="text-3xl  font-semibold text-teal-500">Trending</h3>
          <div className=" space-x-2">
            <Button
              colorScheme={movie ? "teal" : "transparent"}
              color="white"
              size="xs"
              rounded="sm"
              className={movie ? "" : "bg-slate-600 active:bg-slate-100/25"}
              onClick={() => {
                setMovie(true);
              }}
            >
              Movies
            </Button>

            <Button
              colorScheme={!movie ? "teal" : "transparent"}
              className={!movie ? "" : "bg-slate-600 active:bg-slate-100/25 "}
              color="white"
              size="xs"
              rounded="sm"
              onClick={() => {
                setMovie(false);
              }}
            >
              TV Shows
            </Button>
          </div>
        </div>
        <div>
          {movie ? (
            <Swiper
              modules={[Navigation, Pagination, A11y, Lazy]}
              {...settings}
              navigation
              className={`cards `}
              id="container"
            >
              {movies?.map((movie, index) => (
                <SwiperSlide className="h-full " key={movie.id}>
                  <Card movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y, Lazy]}
              {...settings}
              navigation
              className={`cards `}
              id="container"
            >
              {" "}
              {!TVQuery.isLoading &&
                TVQuery.data?.map((serie, index) => (
                  <SwiperSlide className="h-full " key={serie.id}>
                    <TvCard serie={serie} />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default Trending;
