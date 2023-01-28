import useDetails from "../../../../hooks/useDetails";
import { Result } from "../../../../interfaces/Popular";
interface Props {
  movie: Result;
}

const SimilarCard = ({ movie }: Props) => {
  return (
    <div className="bg-cover bg-center bg-no-repeat rounded-md cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt=""
        className=""
      />{" "}
    </div>
  );
};

export default SimilarCard;
