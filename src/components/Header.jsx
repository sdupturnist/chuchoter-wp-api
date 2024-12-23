"use client";
import Link from "next/link";
import Logo from "./Logo";
import { motion, useViewportScroll } from "framer-motion";
import { useModalContext } from "@/context/modalContext";
import { useState, useEffect, useRef } from "react";
import { useThemeContext } from "@/context/themeContext";
import { useCartContext } from "@/context/cartContext";
import SearchBox from "./Search";
import LanguageSwitch from "./LangaugeSwitch";
import { useLanguageContext } from "@/context/LanguageContext";

import {
  catUrl,
  colorTheme,
  frontendUrl,
  languageText,
  transalateText,
} from "@/utils/variables";
import { useSiteContext } from "@/context/siteContext";
import { useRouter } from "next/router";

export default function Nav({ theme, page, tags }) {
  const { setModalFor, setShowModal } = useModalContext();
  const { themeLayout, setThemeLayout } = useThemeContext();
  const { cartItems } = useCartContext();
  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();
  const { catData, headerMenus, headerCatMenus } = useSiteContext();

  const router = useRouter();
  const { query } = router;

  const currentTheme =
    (query.category && query.category.toString().toLowerCase()) ||
    themeLayout?.toString().toLowerCase();

  // TOGGLE MENU
  const [hidden, setHidden] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const { scrollY } = useViewportScroll();

  const color = colorTheme(currentTheme);
  const headerColorLogoHome = colorTheme(currentTheme);
  const headerColor = colorTheme(currentTheme);

  const cartCount = cartItems && cartItems.length;

  const currentCartCOunt = cartCount == null ? 0 : cartCount;

  //const color = "#c89a3f";

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  useEffect(() => {
    // Set initial screen width
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return scrollY.onChange(() => update());
  }, [scrollY]);

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
  };

  const openNavigationModal = () => {
    setShowModal(true);
    setModalFor("nav");
  };

  const Navigations = (color, language) => {
    return (
      <>
        <Link
          aria-label="Home"
          title="Home"
          href={`${frontendUrl}/`}
          onClick={() => {
            setThemeLayout("gray");
          }}
          style={{ color: color }}>
          {transalateText(
            siteTransalations?.generalTranslations?.home,
            language
          )}
        </Link>

        {FilteredCategories(color, language)}
        {headerMenus &&
          headerMenus.map((item, key) => (
            <Link
              key={key}
              aria-label={item?.title}
              title={item?.title}
              href={`${frontendUrl}/${item?.title
                ?.replace(/-ar/g, "")
                .replace(/-en/g, "")
                .replace(/-/g, "-")
                .toLowerCase()}/`}
              onClick={() => setThemeLayout("gray")}
              style={{
                color,
              }}>
              {language === "en" ? item?.title : item?.acf?.arabic}
            </Link>
          ))}
      </>
    );
  };

  function NavigationRight(page, color) {
    return (
      <>
        <Link
          href={`/cart/`}
          style={{
            color: color,
          }}
          className={`mx-3`}>
          {transalateText(
            siteTransalations?.generalTranslations?.cart,
            language
          )}{" "}
          ({currentCartCOunt})
        </Link>
        <LanguageSwitch color={color} label="test language toggle" />
        <SearchBox theme={color} page={page} />
        <button
          aria-label="Navigation Menu"
          title="Navigation Menu"
          className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden p-0"
          onClick={openNavigationModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="14"
            fill="none"
            viewBox="0 0 21 14">
            <path
              stroke={color}
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5"
            />
          </svg>
        </button>
      </>
    );
  }

  const FilteredCategories = (headerColor, language) => {
    return (
      <>
        {headerCatMenus &&
          headerCatMenus.map((item, index) => (
            <li key={index}>
              <Link
                aria-label={item?.post_title}
                title={item?.post_title}
                href={catUrl(
                  item?.url.replace(/https?:\/\//, "").toLowerCase(),
                  language
                )}
                onClick={(e) => setThemeLayout(item?.post_title.toLowerCase())}
                style={{ color: headerColor }}>
                {language === "en" ? item?.post_title : item?.acf?.arabic}
              </Link>
            </li>
          ))}
      </>
    );
  };

  const tagedFilteredItems =
    tags && tags.filter((item) => item.slug === query.category);



  function catHeader() {
    return (
      <>
        <header
          className={`w-full ${
            themeLayout == "black"
              ? "bg-black"
              : `theme-${
                  query.tag !== "yes" ? currentTheme : "chocolates"
                }-header-mobile`
          } sm:py-[30px] pt-[16px] pb-[24px] relative z-50 gap-[20px] grid [&>*]:text-white lg:hidden`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo
                url={`/`}
                alt={"Chuchoter Logo"}
                logoTitle={"Chuchoter Logo"}
                theme="white"
              />
              <div className="flex gap-[10px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]">
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[4px]">
                  {NavigationRight("page-cat", "#fff")}
                </div>
              </div>
            </div>
          </div>
          {themeLayout !== "black" && query.tag !== "yes" && (
            <div className="container grid sm:gap-[10px] gap-[0]">
              <h1 className="font-primary sm:text-[10vw] text-[28px] capitalize">
                {transalateText(
                  siteTransalations?.catTranslations?.[themeLayout],
                  language
                )}
              </h1>

              <p className="sm:text-[17px] text-[14px] font-light">
                {transalateText(
                  siteTransalations?.catTranslations?.explore_collection,
                  language
                )}
              </p>
            </div>
          )}

          {query.tag === "yes" && (
            <div className="container grid sm:gap-[10px] gap-[0]">
              <h1 className="font-primary sm:text-[10vw] text-[28px] capitalize">
                {languageText(
                 tags[0]?.tags[0]?.name,

                 tags[0]?.acf?.arabic_text ||
                  tags[0]?.tags[0]?.name,

                  language,
                  "no"
                )}
              </h1>
            </div>
          )}
        </header>
        <header
          className={`w-full sm:py-[30px] py-[16px]  right-0 top-0 left-0 z-50 border-b border-solid border-${currentTheme}-100 bg-white lg:block hidden`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo url={`/`} alt={"#"} logoTitle={"#"} theme={headerColor} />

              <div
                className={`flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]`}>
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations(headerColor, language)}
                </ul>
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]">
                  {NavigationRight("page-cat", headerColor)}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  function productSingleHeader() {
    return (
      <>
        <header
          className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50 border-b bg-white`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo url={`/`} alt={"#"} logoTitle={"#"} theme={"#c89a3f"} />
              <div className="flex gap-[24px] items-centerfont-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]">
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations("", language)}
                </ul>
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]">
                  {NavigationRight("page-single", "#c89a3f")}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  let headerType;
  switch (page) {
    case "home":
      headerType = (
        <header
          className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo
                url={`/`}
                alt={"#"}
                logoTitle={"#"}
                theme={headerColorLogoHome}
              />
              <div className="flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]">
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations(headerColor, language)}
                </ul>
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]">
                  {NavigationRight()}
                </div>
              </div>
            </div>
          </div>
        </header>
      );
      break;

    case "home2":
      headerType = (
        <header
          className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo url={`/`} alt={"#"} logoTitle={"#"} theme="#c89a3f" />
              <div className="flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]">
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations(headerColor, language)}
                </ul>
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]">
                  {NavigationRight("home2", color)}
                </div>
              </div>
            </div>
          </div>
        </header>
      );
      break;

    case "category":
      headerType = catHeader();

      break;

    case "product-single":
      headerType = productSingleHeader();

      break;

    default:
      headerType = (
        <header
          className={`w-full sm:py-[30px] py-[16px]  right-0 top-0 left-0 z-50 border-b border-solid border-gray-200 bg-white`}>
          <div className="container">
            <div className="flex items-center justify-between">
              <Logo url={`/`} alt={"#"} logoTitle={"#"} theme={"#c89a3f"} />
              <div className="flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]">
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations("", language)}
                </ul>
                <div className="flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]">
                  {NavigationRight("", "#c89a3f")}
                </div>
              </div>
            </div>
          </div>
        </header>
      );
      break;
  }

  return (
    <motion.div
      className="sticky top-0 right-0 left-0 z-20"
      variants={headerVariants}
      animate={hidden ? "hidden" : "visible"}>
      {headerType}
    </motion.div>
  );
}
