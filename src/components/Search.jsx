import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";
import { colorTheme } from "@/utils/variables";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";

export default function SearchBox({ theme, page }) {
  const router = useRouter();
  const { setShowModal } = useModalContext();
  const { siteTransalations } = useSiteContext();
  const { themeLayout } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const currentTheme = themeLayout.toString().toLowerCase();
  const color = colorTheme(currentTheme);

  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  // Toggle search box visibility
  const toggleSearchBox = () => {
    setSearchVisible(!isSearchVisible);
  };

  // Hide search box when clicking outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setShowModal(false);
      router.push({
        pathname: "/search",
        query: { query: encodeURIComponent(searchTerm) },
      });
    } else {
      router.push("/search");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  let type;
  switch (page) {
    case "home2":
      type = (
        <>
          <div className="flex">
            {!isSearchVisible && (
              <button
                aria-label="Search"
                title="Search"
                className="btn btn-link  !bg-transparent !border-none"
                onClick={toggleSearchBox}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  fill="none"
                  viewBox="0 0 18 19">
                  <path
                    stroke="#c89a3f" // You can set this dynamically
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.665 16.465a7.665 7.665 0 1 0 0-15.33 7.665 7.665 0 0 0 0 15.33Zm5.33-1.935L17 17.525"
                  />
                </svg>
              </button>
            )}
            {isSearchVisible && (
              <div
                ref={searchRef}
                className="search-box sm:relative sm:top-0 sm:right-0 sm:left-0 fixed left-[20px] right-[20px] top-[20px]">
                <label className="input  placeholder:text-black border-black flex items-center gap-2">
                  <input
                    type="text"
                    className="grow bg-white"
                    placeholder="Search"
                    style={{
                      color: "#c89a3f",
                      borderColor: "#c89a3f",
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>
        </>
      );
      break;

    case "home":
      type = (
        <>
          <div className="flex">
            {!isSearchVisible && (
              <button
                aria-label="Search"
                title="Search"
                className="btn btn-link !bg-transparent !border-none"
                onClick={toggleSearchBox}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  fill="none"
                  viewBox="0 0 18 19">
                  <path
                    stroke={color} // You can set this dynamically
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.665 16.465a7.665 7.665 0 1 0 0-15.33 7.665 7.665 0 0 0 0 15.33Zm5.33-1.935L17 17.525"
                  />
                </svg>
              </button>
            )}
            {isSearchVisible && (
              <div
                ref={searchRef}
                className="search-box sm:relative sm:top-0 sm:right-0 sm:left-0 fixed left-[20px] right-[20px] top-[20px]">
                <label className="input  placeholder:text-black border-black flex items-center gap-2">
                  <input
                    type="text"
                    className="grow bg-white"
                    placeholder="Search"
                    style={{
                      background: "transparent !important",
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>
        </>
      );
      break;

    case "category":
      type = (
        <>
          <div className="flex">
            {!isSearchVisible && (
              <>
                <button
                  aria-label="Search"
                  title="Search"
                  className="btn btn-link  !bg-transparent !border-none lg:flex hidden"
                  onClick={toggleSearchBox}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    fill="none"
                    viewBox="0 0 18 19">
                    <path
                      stroke={color} // You can set this dynamically
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8.665 16.465a7.665 7.665 0 1 0 0-15.33 7.665 7.665 0 0 0 0 15.33Zm5.33-1.935L17 17.525"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Search"
                  title="Search"
                  className="btn btn-link  !bg-transparent !border-none lg:hidden"
                  onClick={toggleSearchBox}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    fill="none"
                    viewBox="0 0 18 19">
                    <path
                      stroke={"white"} // You can set this dynamically
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8.665 16.465a7.665 7.665 0 1 0 0-15.33 7.665 7.665 0 0 0 0 15.33Zm5.33-1.935L17 17.525"
                    />
                  </svg>
                </button>
              </>
            )}
            {isSearchVisible && (
              <div
                ref={searchRef}
                className="search-box sm:relative sm:top-0 sm:right-0 sm:left-0 fixed left-[20px] right-[20px] top-[20px]">
                <label className="input  placeholder:text-black border-black flex items-center gap-2 border-${currentTheme}-100">
                  <input
                    type="text"
                    className={`grow bg-white text-${currentTheme}-100`}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      background: "transparent !important",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill={color}
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>
        </>
      );
      break;

    default:
      type = (
        <div className="flex">
          {!isSearchVisible && (
            <button
              aria-label="Search"
              title="Search"
              className="btn btn-link  !bg-transparent !border-none"
              onClick={toggleSearchBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19">
                <path
                  stroke={theme}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8.665 16.465a7.665 7.665 0 1 0 0-15.33 7.665 7.665 0 0 0 0 15.33Zm5.33-1.935L17 17.525"
                />
              </svg>
            </button>
          )}
          {isSearchVisible && (
            <div
              ref={searchRef}
              className="search-box sm:relative sm:top-0 sm:right-0 sm:left-0 fixed left-[20px] right-[20px] top-[20px]">
              <label className="input  placeholder:text-black border-black flex items-center gap-2">
                <input
                  type="text"
                  className="grow bg-white"
                  placeholder="Search"
                  style={{
                    color,
                    borderColor: color,
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          )}
        </div>
      );
      break;
  }

  return type;
}
