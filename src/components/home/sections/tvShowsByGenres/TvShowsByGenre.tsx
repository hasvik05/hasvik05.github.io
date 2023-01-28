import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper";
import TvCard from "../cards/TvCard";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Genre } from "../../../../interfaces/Details";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useTvShowByGenre from "../../../../hooks/useTvShowByGenre";
interface Props {
  genre: Genre;
}

const MoviesByType = ({ genre }: Props) => {
  const { tvGenreQuery } = useTvShowByGenre(genre);
  const { data, isLoading } = tvGenreQuery;

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
    
  } */ const settings = {
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
    <div className="flex flex-col gap-4  relative overflow-visible min-h-[350px]">
      <div className="flex items-baseline justify-between text-white">
        <h3 className="text-2xl  font-semibold text-white/75 ">{genre.name}</h3>
        <div className="flex gap-1 ">
          <Link to={`/tmdb/tvshows/genre/${genre.id}`}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="cyan"
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, A11y, Scrollbar]}
          {...settings}
          className="genres  static "
          id="container "
          scrollbar={{ draggable: true }}
          speed={150}
        >
          {!isLoading &&
            data?.map((serie, index) => (
              <SwiperSlide className="h-full " key={index}>
                <TvCard serie={serie} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesByType;
