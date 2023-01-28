import { createHashRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import Movie from "../components/home/sections/individualMovie/Movie";
import Tv from "../components/home/sections/individualTvShow/Tv";
import GenreSection from "../components/home/sections/moviesByGenreSection.tsx/GenreSection";
import IndividualGenre from "../components/home/sections/moviesByGenreSection.tsx/IndividualGenre";
import SearchSection from "../components/home/sections/search/SearchSection";
import IndividualTvGenre from "../components/home/sections/tvShowsByGenres/IndividualTvGenre";
import TvGenreSection from "../components/home/sections/tvShowsByGenres/TvGenreSection";
import CollectionOverview from "../components/home/sections/collection/Collection";
import NotFoundPage from "../components/home/NotFoundPage";
export const router = createHashRouter([
  {
    path: "/tmdb",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      { path: "movie/:id", element: <Movie /> },
      { path: "tv/:id", element: <Tv /> },
      { path: "search/:name", element: <SearchSection /> },
      {
        path: "movies",
        element: <GenreSection />,
      },
      { path: "movies/genre/:id", element: <IndividualGenre /> },
      {
        path: "tvshows",
        element: <TvGenreSection />,
      },
      { path: "tvshows/genre/:id", element: <IndividualTvGenre /> },
      { path: "collection/:id", element: <CollectionOverview /> },
      { path: "*", element: <Navigate to="home" /> },
    ],
  },
  { path: "/", element: <Navigate to="/tmdb/home" /> },
  { path: "*", element: <NotFoundPage /> },
]);
