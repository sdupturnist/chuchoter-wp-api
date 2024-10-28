"use client";
import Header from "./Header";
import Footer from "./Footer";
import { useModalContext } from "@/context/modalContext";
import Link from "next/link";
import { useThemeContext } from "@/context/themeContext";
import AddReview from "@/components/Forms/AddReviews";
import { useEffect, useMemo, useState } from "react";
import { useProductContext } from "@/context/productContext";
import FilterProducts from "./Filter";
import { useLanguageContext } from "@/context/LanguageContext";
import {
  catUrlWithSubCat,
  colorTheme,
  frontendUrl,
  transalateText,
} from "@/utils/variables";
import { useSiteContext } from "@/context/siteContext";

export default function Layout({ children, type, page, header }) {
  const { showModal, setShowModal, setModalData, modalFor, setIsClassAdded } =
    useModalContext();
  const { productId, productName, productReviewCount } = useProductContext();
  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();
  const {
    catData,
    navigationData,
    subCategoryData,
    sitemapMenus,
    headerMenus,
    contactData,
  } = useSiteContext();

  const { themeLayout, setThemeLayout } = useThemeContext();
  const currentTheme = themeLayout?.toString().toLowerCase();

 
  const color = colorTheme(currentTheme);

  const FilteredCategoriesAccordin = (language) => {
    const groupedItems = sitemapMenus?.reduce((acc, item) => {
      const parentId = item.menu_item_parent || "0"; // Use '0' for top-level items
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(item);
      return acc;
    }, {});

    return (
      sitemapMenus &&
      groupedItems["0"]?.map((item, key) => (
        <div key={key} className="collapse collapse-plus rounded-none">
          {groupedItems[item.ID] == null ? (
            <Link
              onClick={() => {
                setThemeLayout(`black`);
                closeModal();
              }}
              aria-label={item?.post_title}
              title={item?.post_title}
              style={{ color: "#fff" }}
              href={catUrlWithSubCat(item?.title, item?.post_title, language)}
              className="hover:opacity-50">
              {language === "en" ? item?.title : item?.acf?.arabic}
            </Link>
          ) : (
            <>
              <input
                type="radio"
                className="min-h-[10px] after:top-0"
                name="my-accordion-3"
                id={`category-${item.ID}`} // Changed ID to be unique
              />
              <div
                className="collapse-title p-0 min-h-0"
                style={{ color: "#fff" }}>
                {language === "en" ? item?.title : item?.acf?.arabic}
              </div>
            </>
          )}
          <div className="collapse-content !pb-0 px-0 mb-0">
            {groupedItems[item.ID] && (
              <ul className="mt-[24px] grid gap-[24px] m-0 p-0">
                {groupedItems[item.ID].map((childItem, key) => (
                  <li key={key}>
                    <Link
                      onClick={() => {
                        setThemeLayout(
                          `${item?.title?.replace(/-/g, "-").toLowerCase()}`
                        );
                        closeModal();
                      }}
                      aria-label={childItem?.post_title}
                      title={childItem?.post_title}
                      style={{ color: "#fff" }}
                      href={catUrlWithSubCat(
                        item?.title,
                        childItem?.post_title,
                        language
                      )}
                      className="hover:opacity-50">
                      {language === "en"
                        ? childItem?.title
                        : childItem?.acf?.arabic}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))
    );
  };

  const colors = useMemo(
    () => [
      '#c89a3f url("/images/choclate-bg-mobile-header-trans.png")',
      '#E62263 url("/images/flower-bg-mobile-header-trans.png")',
      '#E79F02 url("/images/cake-bg-mobile-header-trans.png")',
      '#258F89 url("/images/event-bg-mobile-header-trans.png")',
    ],
    []
  );

  const textColors = useMemo(
    () => ["#FCF9F4", "#fdd9d9", "#fffbe8", "#eaf4f3"],
    []
  );

  const [background, setBackground] = useState(colors[0]);
  const [textColor, setTextColor] = useState(textColors[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("");
  const [filterHeight, setFilterHeight] = useState("auto");

  useEffect(() => {
    // Function to update the background and text color
    const updateColors = () => {
      setFadeClass("fade-out--"); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % colors.length;
          setBackground(colors[nextIndex]);
          setTextColor(textColors[nextIndex]); // Update text color corresponding to background color
          return nextIndex;
        });
        setFadeClass(""); // Remove fade-out class to fade in
      }, 1000); // Delay to match transition duration
    };

    // Set an interval to change the colors every 3 seconds (3000ms)
    const intervalId = setInterval(updateColors, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [colors, textColors]);

  const updateHeight = () => {
    const sidebarHeight = window.innerHeight - 150; // Adjust the 80px to account for the header and footer
    setFilterHeight(sidebarHeight);
  };

  useEffect(() => {
    // Initial height set
    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Apply the background color and text color to the component
  const style = {
    background: background,
    color: textColor, // Apply the text color
    transition: "background 1s ease, color 1s ease, opacity 1s ease",
  };

  const closeModal = () => {
    setShowModal(!showModal);
    setIsClassAdded(false);
    setModalData([]);
  };

  const Navigations = (language) => {
    return (
      <>
        <Link
          aria-label="Home"
          title="Home"
          href={`${frontendUrl}/${language}`}
          onClick={() => {
            setThemeLayout("gray");
            closeModal();
          }}
          style={{ color: "#fff" }}>
          {transalateText(
            siteTransalations?.generalTranslations?.home,
            language
          )}
        </Link>

        {FilteredCategoriesAccordin(language)}

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
              onClick={() => {
                setThemeLayout("gray");
                closeModal();
              }}
              style={{ color: style.color }}>
              {language === "en" ? item?.title : item?.acf?.arabic}
            </Link>
          ))}
      </>
    );
  };

  return (
    <>
      {header !== "color" && <Header page={page} />}

      <main>{children}</main>
      <Footer page={page} />

      <a
        href={`https://api.whatsapp.com/send?phone=${
          contactData && contactData[0].acf?.whatsapp
        }&text=Need Help? Chat with Us Anytime!`}
        class="float"
        target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-whatsapp"
          viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </a>

      {/* ALL POPUP MODALS START HERE */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0  z-[99] after:content-['']  after:fixed after:bg-[#33333399] after:bg-opacity-60 after:left-0 after:right-0 after:top-0 after:bottom-0 after:z-[-1]">
          {/* MODAL NAVIGATION START*/}
          {modalFor == "nav" ? (
            <div className="container px-0">
              <div
                className={`fade-- ${fadeClass} main-nav h-screen font-semibold [&>*]:text-[20px] uppercase !bg-no-repeat !bg-cover`}
                style={{
                  background: style.background,
                }}>
                <button
                  aria-label="Home"
                  title="Home"
                  className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none fixed right-[10px] top-[10px]"
                  onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke={style.color}
                      strokeLinecap="round"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <div className="grid lg:gap-[50px] gap-[24px] pt-[70px] px-[24px]">
                  {Navigations(language)}
                </div>
              </div>
            </div>
          ) : null}
          {/* MODAL NAVIGATION END*/}

          {/* MODAL FILTER START*/}
          {modalFor == "filter" ? (
            <div className="container px-0">
              <div className="bg-white w-[280px] h-screen">
                <div className="border-b border-gray-200 border-solid w-[280px] h-[60px] p-[16px] flex justify-between">
                  <span
                style={{color: color}}
                    className={`text-${currentTheme}-100 uppercase block font-semibold text-[14px] leading-[0] pt-[14px]`}>
                    {transalateText(
                      siteTransalations?.generalTranslations?.filter,
                      language
                    )}
                  </span>
                  <button
                    aria-label="Home"
                    title="Home"
                    className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none p-0 h-auto min-h-0"
                    onClick={closeModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 14 14">
                      <path
                        stroke={color}
                        strokeLinecap="round"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="overflow-scroll overflow-x-hidden filter-items-wrpr"
                  style={{ height: `${filterHeight}px` }}>
                  <FilterProducts />
                </div>
                <div className="px-[16px] pt-[20px] pb-[24px]  border-t border-gray-200 border-solid">
                  <button
                    style={{ background: color }}
                    className={`btn rounded-[6px] w-full  text-white hover:border-${currentTheme}-100`}
                    onClick={closeModal}>
                    {transalateText(
                      siteTransalations?.generalTranslations?.apply,
                      language
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {/* MODAL FILTER END*/}

          {/* MODAL ADD REVIEW START*/}
          {modalFor == "add-review" ? (
            <div className="container h-screen px-0 flex sm:items-center items-end justify-center relative">
              <div className="sm:max-w-[500px] mx-auto bg-white sm:rounded-[10px] p-[40px] sm:w-[90%] w-[100%] relative">
                <button
                  aria-label="Home"
                  title="Home"
                  className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none p-0 h-auto min-h-0 absolute top-[20px] right-[20px]"
                  onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke={color}
                      strokeLinecap="round"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <AddReview
                  productId={productId}
                  productName={productName}
                  productReviewCount={productReviewCount}
                />
              </div>
            </div>
          ) : null}
          {/* MODAL ADD REVIEW END*/}
        </div>
      )}
    </>
  );
}
