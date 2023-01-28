import { Link } from "react-router-dom";
import useCollection from "../../../../hooks/useCollection";
interface Props {
  collection_id?: string;
  backdrop_path?: string;
}
const CollectionOverview = ({ collection_id, backdrop_path }: Props) => {
  const { collectionQuery } = useCollection(collection_id!);
  const { data, isLoading } = collectionQuery;
  return (
    <div className="relative overflow-hidden rounded-lg lg:h-[420px]">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
      <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
        <div>
          <h2 className="text-xl font-bold text-white">{data?.name}</h2>
          <p className="mt-1 text-sm text-gray-300">{data?.overview}</p>
        </div>
        <Link
          to={`/tmdb/collection/${collection_id}`}
          className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 py-3 px-4 text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
        >
          View the collection
        </Link>
      </div>
    </div>
  );
};
export default CollectionOverview;
