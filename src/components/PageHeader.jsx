import { useLanguageContext } from "@/context/LanguageContext";
import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";
import { catTranslations, generalTranslations } from "@/utils/transalations";
import Link from "next/link";

export default function PageHeader({
  title,
  type,
  data,
  initialData,
  mainCat,
  subCat,
}) {
  const { themeLayout } = useThemeContext();
  const { setModalFor, setShowModal } = useModalContext();
  const { language } = useLanguageContext();

  const currentTheme = themeLayout.toString().toLowerCase();

  let titleLanguage;
  switch (title) {
    case "chocolates":
      titleLanguage = catTranslations.chocolates[language];
      break;
    case "flowers":
      titleLanguage = catTranslations.flowers[language];
      break;
      break;
    case "cakes":
      titleLanguage = catTranslations.cakes[language];
      break;
      break;
    case "events":
      titleLanguage = catTranslations.events[language];
      break;
  }

  const openFilterModal = () => {
    setShowModal(true);
    setModalFor("filter");
  };

  let color;
  switch (currentTheme) {
    case "white":
      color = "white";
      break;
    case "chocolates":
      color = "#c89a3f";
      break;
    case "flowers":
      color = "#E62263";
      break;
    case "cakes":
      color = "#E79F02";
      break;
    case "events":
      color = "#258F89";
      break;
    default:
      color = "#c89a3f";
      break;
  }

  let pageHeaderType;

  switch (type) {
    case "cat":
      const FilteredCategories = (color) => {
        // const allSubCategories = data
        //   .flatMap((item) => item.acf.sub_categories)
        //   .filter(
        //     (subCategory, index, self) =>
        //       index === self.findIndex((s) => s.ID === subCategory.ID)
        //   );

        const allSubCategories =
          data &&
          data.map((item, index) => (
            <>
              {item && (
                <Link
                  key={index}
                  aria-label={item?.title?.rendered}
                  title={item?.title?.rendered}
                  className={`btn btn-${mainCat}-border rounded-[6px] !capitalize !font-regular !text-[13px]`}
                  href={`/${mainCat.toLowerCase()}/${language}/?main_categories=${mainCat
                    ?.replace(/-ar/g, "")
                    .replace(/-en/g, "")
                    .replace(/ /g, "-")
                    .toLowerCase()}&sub_categories=${item?.title?.rendered
                    ?.replace(/-ar/g, "")
                    .replace(/-en/g, "")
                    .replace(/ /g, "-")
                    .toLowerCase()}`}>
                  {language === "en"
                    ? item?.title?.rendered
                    : item?.acf?.title_arabic}
                </Link>
              )}
            </>
          ));

        return allSubCategories;
      };

      const FilteredCategoriesMore = (color) => {
        const allSubCategories =
          data &&
          data.map((item, index) => (
            <>
              {item && (
                <li key={index} className="!block">
                  <Link
                    aria-label={item?.title?.rendered}
                    title={item?.title?.rendered}
                    className={`w-full px-[15px] hover:border-[${color}] rounded-none hover:bg-transparent text-[${color}] btn bg-transparent border-0 hover:border-gray-300 !capitalize !font-regular !text-[13px]`}
                    href={`/${mainCat.toLowerCase()}/${language}/?main_categories=${mainCat
                      ?.replace(/-ar/g, "")
                      .replace(/-en/g, "")
                      .replace(/ /g, "-")
                      .toLowerCase()}&sub_categories=${item?.title?.rendered
                      ?.replace(/-ar/g, "")
                      .replace(/-en/g, "")
                      .replace(/ /g, "-")
                      .toLowerCase()}`}>
                    {language === "en"
                      ? item?.title?.rendered
                      : item?.acf?.title_arabic}
                  </Link>
                </li>
              )}
            </>
          ));

        return allSubCategories;
      };

      pageHeaderType = (
        <div className="xl:flex  justify-between xl:items-end gap-[30px] w-full">
          <div className="xl:w-[50%] hidden lg:block">
            <h1
              className={`font-primary first-letter:uppercase text-[40px]`}
              style={{
                color: color,
              }}>
              {titleLanguage}
            </h1>
            <p
              style={{
                color: color,
              }}>
              {catTranslations.explore_collection[language]}
            </p>
          </div>
          <div className="flex xl:w-[50%] gap-[6px] w-full mt-[20px] xl:mt-[0]">
            <div className="flex gap-[6px] w-full xl:justify-end">
              {
                <>
                  <Link
                    aria-label={title.replace(/-/g, " ")}
                    className={`btn btn-${mainCat}-border border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}
                    title={title.replace(/-/g, " ")}
                    href={`/${
                      mainCat && mainCat.replace(/ /g, "-").toLowerCase()
                    }/${language}?main_categories=${
                      mainCat && mainCat.replace(/ /g, "-").toLowerCase()
                    }`}>
                    {generalTranslations.all[language]}
                  </Link>
                  <div className="sm:flex hidden gap-2">
                    {FilteredCategories(color)}
                  </div>
                  <div className="dropdown dropdown-hover sm:dropdown-end dropdown-start  rounded-[6px] hover:bg-transparent sm:hidden">
                    <div
                      tabIndex={0}
                      role="button"
                      className={`btn btn-${mainCat}-border px-[20px] border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}>
                      <span className={`text-[${color}]`}>
                        {" "}
                        {generalTranslations.categories[language]}
                      </span>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px] m-0">
                      {FilteredCategoriesMore(currentTheme)}
                    </ul>
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
