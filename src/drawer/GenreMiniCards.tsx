import { Link } from "react-router-dom";
import { Genre } from "../interfaces/Details";

interface Props {
  genre: Genre;
  onClose: () => void;
}

const GenreMiniCards = ({ genre, onClose }: Props) => {
  return (
    <Link
      to={`/tmdb/movies/genre/${genre.id}`}
      className=" text-base py-1 px-1 bg-slate-800 text-white/75 active:bg-blue-600"
      onClick={onClose}
    >
      {genre.name}
    </Link>
  );
};

export default GenreMiniCards;
