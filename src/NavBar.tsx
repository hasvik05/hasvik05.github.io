import {
  Avatar,
  Grid,
  Show,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  useMediaQuery,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import useScroll from "./hooks/useScroll";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSearch from "./hooks/useSearch";
import SearchCard from "./components/home/sections/cards/SearchCard";
import { useMovieStore } from "./store/store";
import DrawerMenu from "./drawer/Drawer";
const NavBar = () => {
  const { searchOpen } = useMovieStore();
  const { changeSearchOpen } = useMovieStore();
  const [inputValue, setInputValue] = useState("");

  const [deferredInputValue] = useDebounce(inputValue, 500);
  const inputDesktopRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isScrolled } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { searchQuery } = useSearch(deferredInputValue);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        changeSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);
  useEffect(() => {
    if (isOpen) {
      changeSearchOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={
          location.pathname === "/tmdb/home"
            ? `h-[70px] z-[999] w-screen justify-center flex fixed  ${
                isScrolled || searchOpen ? "bg-slate-900" : ""
              } top-0 px-4 py-2 lg:px-6 items-center duration-[500ms]`
            : "h-[70px] z-[999] w-screen justify-center flex sticky bg-slate-900 top-0 px-4 py-2 lg:px-6 items-center duration-[500ms]"
        }
        id="nav"
      >
        {!isLargerThan768 ? (
          <>
            <Show below="md">
              <Grid className="grid-cols-3 w-full p-2 h-full items-center">
                <button
                  onClick={onOpen}
                  className="justify-self-start flex justify-center text-center items-center"
                >
                  <HamburgerIcon
                    boxSize={6}
                    className=" stroke-white"
                    color="white"
                  />
                </button>
                <NavLink
                  to="/tmdb/home"
                  className="justify-self-center h-full w-auto cursor-pointer"
                >
                  <img
                    className="justify-self-center h-full w-auto cursor-pointer"
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  />
                </NavLink>
                <HStack className="justify-self-end p-1  items-center flex">
                  <Avatar boxSize={7} bg="transparent" />
                  {searchOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-6 h-6 stroke-[3px] cursor-pointer "
                      onClick={() => changeSearchOpen(false)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 stroke-cyan-600 stroke-[3px] cursor-pointer"
                      onClick={() => changeSearchOpen(true)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  )}
                </HStack>
              </Grid>
              <DrawerMenu isOpen={isOpen} onClose={onClose} />
            </Show>
          </>
        ) : null}
        {isLargerThan768 ? (
          <Show above="md">
            <div className="flex justify-between w-screen p-2 items-center  ">
              <div className="text-base font-semibold text-white flex gap-6  items-center  ">
                <img
                  onClick={() => navigate("/tmdb/home")}
                  className="cursor-pointer "
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                />

                <NavLink to="/tmdb/home" className="hover:text-white/75">
                  Home
                </NavLink>
                <NavLink to="/tmdb/movies" className="hover:text-white/75">
                  Movies
                </NavLink>
                <NavLink
                  to="/tmdb/tvshows"
                  className="whitespace-nowrap hover:text-white/75"
                >
                  TV Shows
                </NavLink>
              </div>
              <HStack className="p-1 gap-2  items-center flex relative">
                <Show above="lg">
                  <div ref={ref} onClick={() => changeSearchOpen(true)}>
                    <InputGroup className="">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                      />
                      {/*   <form
                        onSubmit={() =>
                          navigate(`./tmdb/search/${deferredInputValue}`)
                        }
                      > */}
                      <Input
                        ref={inputDesktopRef}
                        type="text"
                        placeholder="Movie or TV Show..."
                        color="white"
                        className=" placeholder-gray-300 "
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            navigate(`/tmdb/search/${deferredInputValue}`);
                            inputDesktopRef.current?.blur();
                            changeSearchOpen(false);
                          }
                        }}
                      />
                      {/*   </form> */}
                    </InputGroup>{" "}
                    {!inputValue ? null : (
                      <div
                        /*   onMouseEnter={() => changeSearchOpen(true)} */
                        className={`absolute  top-[105%] p-3 left-0 -right-[16px] bg-slate-900 ${
                          searchOpen ? "inline" : "hidden"
                        }`}
                      >
                        {searchQuery.isError ||
                        searchQuery.data?.length! === 0 ? (
                          <div className="text-lg text-center w-full text-white font-semibold">
                            No results
                          </div>
                        ) : searchQuery.isLoading ? (
                          <div className="flex justify-center w-full p-5 items-center ">
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="xl"
                            />
                          </div>
                        ) : (
                          <>
                            {searchQuery.data?.slice(0, 5).map((result) => (
                              <SearchCard result={result} key={result.id} />
                            ))}

                            <button
                              ref={buttonRef}
                              onClick={() => {
                                changeSearchOpen(false);
                                navigate(`/tmdb/search/${deferredInputValue}`);
                              }}
                              className="mx-1 items-center rounded-md  w-full  bg-teal-500 px-4 py-2  text-white font-semibold text-lg shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mt-1"
                            >
                              View all results
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </Show>
                <Show below="lg">
                  {searchOpen ? (
                    <CloseIcon
                      onClick={() => changeSearchOpen(false)}
                      boxSize="17.5px"
                      stroke="white"
                      className="cursor-pointer bg-transparent"
                      fill="white"
                      color="white"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 stroke-cyan-600 stroke-[3px] cursor-pointer"
                      onClick={() => {
                        changeSearchOpen(true);
                        inputDesktopRef.current?.focus();
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  )}
                </Show>
                <Avatar boxSize={7} bg="transparent" />
              </HStack>
            </div>
          </Show>
        ) : null}
      </nav>
      <Show below="lg">
        <div
          className={`bg-slate-900 left-0  right-0 fixed top-[70px] z-[999]  pb-3 flex flex-col items-center  ${
            searchOpen ? "inline" : "hidden"
          }`}
        >
          {" "}
          <div className="w-[96%] ">
            <InputGroup className="my-2 ">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              {/*   <form
                          onSubmit={() =>
                            navigate(`./tmdb/search/${deferredInputValue}`)
                          }
                        > */}
              <Input
                ref={inputDesktopRef}
                type="text"
                placeholder="Movie or TV Show..."
                color="white"
                className=" placeholder-gray-300 "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/tmdb/search/${deferredInputValue}`);
                    inputDesktopRef.current?.blur();
                    changeSearchOpen(false);
                  }
                }}
              />
              {/*   </form> */}
            </InputGroup>{" "}
          </div>
          {searchQuery.isError || searchQuery.data?.length! === 0 ? (
            <div className="text-lg mt-3 mb-1 text-center w-full text-white font-semibold">
              No results
            </div>
          ) : searchQuery.isLoading ? (
            <div className="flex justify-center w-full p-5 items-center mt-3 mb-1">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {searchQuery.data?.slice(0, 4).map((result, index) => (
                <div key={index} className="w-full">
                  <SearchCard result={result} />
                  {index === 3 ? null : <Divider mx={2} />}
                </div>
              ))}

              <button
                ref={buttonRef}
                onClick={() => {
                  changeSearchOpen(false);
                  navigate(`/tmdb/search/${deferredInputValue}`);
                }}
                className="items-center rounded-md w-[96.7%] sm:w-[98%]  bg-teal-500 px-4 py-2  text-white font-semibold text-lg shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mt-1"
              >
                View all results
              </button>
            </div>
          )}
        </div>
      </Show>
    </>
  );
};
export default NavBar;
