import { Cast } from "../../../../interfaces/TvDetails";
import { Cast as movieCast } from "../../../../interfaces/Details";
import placeholder from "../placeholder.jpg";
interface Props {
  cast: Cast | movieCast;
}
const CastCard = ({ cast }: Props) => {
  return (
    <a
      href="#"
      className="min-w-[180px] flex overflow-hidden rounded-xl h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: cast.profile_path
          ? `url(https://image.tmdb.org/t/p/original/${cast.profile_path})`
          : `url(${placeholder}`,
      }}
    >
      <div className="min-h-[250px] bg-black bg-opacity-30 w-full text-white select-none">
        <div className="h-full flex flex-col justify-end px-4 py-2 ">
          <h3 className="text-base font-semibold">{cast.name}</h3>
          <p className="text-sm ">{cast.character?.split("/")[0]}</p>
        </div>
      </div>
    </a>
  );
};

export default CastCard;
