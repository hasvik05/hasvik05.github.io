import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";
import Footer from "./Footer";
import { useMovieStore } from "./store/store";
import { useEffect, FC } from "react";
import { useLocation } from "react-router-dom";

const App: FC = () => {
  const { status, changeSearchOpen } = useMovieStore();
  const location = useLocation();

  useEffect(() => {
    const element = document.getElementById("firstDiv");
    changeSearchOpen(false);
    if (element) {
      element.scrollIntoView();
    }
  }, [location]);

  return (
    <ChakraProvider>
      <div className="min-h-screen flex flex-col justify-between" id="firstDiv">
        <div className="w-full flex-col items-center flex relative min-h-screen">
          <NavBar />
          <Outlet />
        </div>
        {status !== "success" ? null : <Footer />}
      </div>
    </ChakraProvider>
  );
};

export default App;
