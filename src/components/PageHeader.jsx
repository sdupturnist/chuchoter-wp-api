import { useLanguageContext } from "@/context/LanguageContext";
import { useModalContext } from "@/context/modalContext";
import { useSiteContext } from "@/context/siteContext";
import { useThemeContext } from "@/context/themeContext";
import { catTranslations } from "@/utils/transalations";

import {
  autoCloseDropDown,
  catUrl,
  catUrlWithSubCat,
  colorTheme,
  languageText,
  titleLanguages,
  transalateText,
} from "@/utils/variables";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PageHeader({
  title,
  type,
  data,
  mainCat,
  tagPageHeaderData,
}) {
  const { themeLayout } = useThemeContext();
  const { setModalFor, setShowModal } = useModalContext();
  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();

  const router = useRouter();
  const { query } = router;
  //console.log(navigationData)

  const currentTheme =
    (query.category && query.category.toString().toLowerCase()) ||
    themeLayout?.toString().toLowerCase();

  const color = colorTheme(currentTheme);

  const openFilterModal = () => {
    setShowModal(true);
    setModalFor("filter");
  };

  //console.log(data)

  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open/close state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when an item is clicked
  const closeDropdown = () => {
    setIsOpen(false);
  };

  let pageHeaderType;

  switch (type) {
    case "cat":
      const FilteredCategories = (color, mainCat) => {
        const allSubCategories =
          data &&
          data.map((item, index) =>
            item?.categories
              .filter((subItem) => subItem?.name?.toLowerCase() !== mainCat)
              .map((item, index) => (
                <Link
                  key={index}
                  aria-label={item?.name}
                  title={item?.name}
                  className={`btn btn-${
                    data && mainCat.toLowerCase().replace(/ /g, "-")
                  }-border rounded-[6px] !capitalize !font-regular !text-[13px]`}
                  href={catUrlWithSubCat(mainCat, item?.name, language)}>
                  {languageText(
                    data && item?.name,
                    data && item?.arabic_label,
                    language,
                    "no"
                  )}
                </Link>
              ))
          );

        return allSubCategories;
      };

      const FilteredCategoriesMore = (color) => {
        const allSubCategories =
          data &&
          data.map((item, index) =>
            item?.categories
              .filter((subItem) => subItem?.name?.toLowerCase() !== mainCat)
              .map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={closeDropdown}
                    key={index}
                    aria-label={item?.name}
                    title={item?.name}
                    className={`w-full px-[15px] hover:border-[${color}] rounded-none hover:bg-transparent text-[${color}] btn bg-transparent border-0 hover:border-gray-300 !capitalize !font-regular !text-[13px]`}
                    href={catUrlWithSubCat(mainCat, item?.name, language)}>
                    {languageText(
                      data && item?.name,
                      data && item?.arabic_label,
                      language,
                      "no"
                    )}
                  </Link>
                </li>
              ))
          );

        return allSubCategories;
      };

      const pageHeaderTitle =
        data &&
        data
          .filter((item) =>
            item.categories.some((category) => category.slug === query.category)
          )
          .map((item) => ({
            id: item.id,
            categories: item.categories.filter(
              (category) => category.slug === query.category
            ),
          }));

      const tagedFilteredItems = tagPageHeaderData.filter(
        (item) => item.slug === query.category
      );

      pageHeaderType = (
        <div className="xl:flex  justify-between xl:items-end gap-[30px] w-full">
          <div className="xl:w-[50%] hidden lg:block">
            {data && (
              <h1
                className={`font-primary first-letter:uppercase text-[40px]`}
                style={{
                  color: color,
                }}>
                {languageText(
                  query.tag !== "yes"
                    ? data && pageHeaderTitle[0]?.categories[0]?.name
                    : tagedFilteredItems[0]?.name,

                  query.tag !== "yes"
                    ? (data &&
                        pageHeaderTitle[0]?.categories[0]?.arabic_label) ||
                        (data && pageHeaderTitle[0]?.categories[0]?.name)
                    : tagedFilteredItems[0]?.acf?.arabic_text ||
                        tagedFilteredItems[0]?.name,

                  language,
                  "no"
                )}
              </h1>
            )}
            {query.tag !== "yes" && (
              <p
                style={{
                  color: color,
                }}>
                {transalateText(
                  siteTransalations?.catTranslations?.explore_collection,
                  language
                )}
              </p>
            )}
          </div>
          {query.tag !== "yes" && (
            <div className="flex xl:w-[50%] gap-[6px] w-full mt-[20px] xl:mt-[0]">
              <div className="flex gap-[6px] w-full xl:justify-end">
                {
                  <>
                    {data && data.length > 1 && (
                      <Link
                        aria-label={title.replace(/-/g, " ")}
                        className={`btn btn-${mainCat}-border border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}
                        title={title.replace(/-/g, " ")}
                        href={catUrl(mainCat, language)}>
                        {transalateText(
                          siteTransalations?.generalTranslations?.all,
                          language
                        )}
                      </Link>
                    )}
                    <div className="sm:flex hidden gap-2">
                      {FilteredCategories(color, mainCat)}
                    </div>
                    <div className="dropdown sm:hidden">
                      {/* Button to toggle dropdown */}
                      <button
                        onClick={toggleDropdown}
                        className={`btn btn-${mainCat}-border px-[20px] border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}>
                        {transalateText(
                          siteTransalations?.generalTranslations?.categories,
                          language
                        )}
                      </button>

                      {/* Dropdown menu */}
                      {isOpen && (
                        <ul className="dropdown-content menu p-0 !shadow-none bg-base-100 rounded-box w-52 z-[1]">
                          {FilteredCategoriesMore(currentTheme)}
                        </ul>
                      )}
                    </div>

                    {data && data.length > 3 && (
                      <div className="dropdown dropdown-hover dropdown-end  rounded-[6px]">
                        <div
                          tabIndex={0}
                          role="button"
                          className={`btn hover:border-[${color}] bg-transparent border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] px-[10px]`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="32"
                            fill={currentTheme}
                            viewBox="0 0 256 256">
                            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                          </svg>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px]">
                          {FilteredCategoriesMore(currentTheme)}
                        </ul>
                      </div>
                    )}
                  </>
                }
              </div>
              <button
                onClick={openFilterModal}
                className={`btn btn-${mainCat}-border border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] hover:border-[${color}]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="16"
                  fill="none"
                  viewBox="0 0 19 16">
                  <path
                    fill={color}
                    stroke={color}
                    strokeWidth=".4"
                    d="M1.125 4.236H4.36a2.825 2.825 0 0 0 5.53 0h7.735a.575.575 0 1 0 0-1.15H9.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15Zm6-2.25a1.675 1.675 0 1 1 0 3.35 1.675 1.675 0 0 1 0-3.35Zm10.5 10.1H15.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15h9.235a2.825 2.825 0 0 0 5.53 0h1.735a.575.575 0 0 0 0-1.15Zm-4.5 2.25a1.676 1.676 0 1 1 0-3.35 1.676 1.676 0 0 1 0 3.35Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      );
      break;

    default:
      pageHeaderType = (
        <div className="text-center sm:[&>h1]:text-[30px] [&>h1]:text-[20px] [&>h1]:font-semibold [&>h1]:uppercase sm:py-[50px] py-[20px]">
          <h1>{title}</h1>
        </div>
      );
      break;
  }

  return pageHeaderType;
}
