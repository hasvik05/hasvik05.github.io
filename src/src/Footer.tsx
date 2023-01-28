import { BsLinkedin, BsGithub } from "react-icons/bs";
const Footer = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-slate-900 justify-self-end w-full"
    >
      <div className="relative mx-auto max-w-screen-xl px-4 py-6  sm:px-6 lg:px-8 lg:pt-9 ">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
          <a
            className="inline-block rounded-full cursor-pointer bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div className="">
            <div className="flex justify-center text-teal-600 lg:justify-start">
              <img
                className="md:w-[320px] w-[250px]"
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              />
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-sm md:text-md text-gray-300 lg:text-left">
              The Movie Database (TMDB) is a community built movie and TV
              database. Every piece of data has been added by our amazing
              community dating back to 2008.
            </p>
          </div>

          <nav aria-label="Footer Nav" className="mt-4 lg:mt-0">
            <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:justify-end">
              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  Projects
                </a>
              </li>

              <li>
                <a>
                  <BsGithub color="white" className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/frederman-m%C3%A9ndez-dub%C3%B3n/">
                  <BsLinkedin color="white" className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300 lg:text-right">
          Copyright &copy; 2022. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
