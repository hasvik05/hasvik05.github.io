import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper";

import "swiper/css/parallax";

import TvCard from "./cards/TvCard";
import useTVShows from "../../../hooks/useTvShows";
interface Props {
  type: string;
  name: string;
  category: string;
}

const SeriesByType = ({ type, name }: Props) => {
  const { TVQuery } = useTVShows(type);
  const { data, isLoading } = TVQuery;
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
          navigation
          className="cards"
          id="container"
        >
          {!isLoading &&
            data?.map((serie, index) => (
              <SwiperSlide className="h-full " key={serie.id}>
                <TvCard serie={serie} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SeriesByType;
