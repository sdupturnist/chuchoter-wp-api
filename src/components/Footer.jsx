import Link from "next/link";
import BottomNav from "./BottomNav";
import { useThemeContext } from "@/context/themeContext";
import { useLanguageContext } from "@/context/LanguageContext";
import {
  catUrl,
  catUrlWithSubCat,
  frontendUrl,
  languageText,
  transalateText,
} from "@/utils/variables";
import { useSiteContext } from "@/context/siteContext";
import { useRouter } from "next/router";
import Logo from "./Logo";

export default function Footer({ page, initialData }) {
  const { language } = useLanguageContext();
  const { footerMenus, sitemapMenus, contactData } = useSiteContext();
  const { themeLayout, setThemeLayout } = useThemeContext();
  const { siteTransalations } = useSiteContext();

  const currentTheme = themeLayout?.toString().toLowerCase();

  const router = useRouter();
  const { query } = router;

  const date = new Date();
  const year = date.getFullYear();

  function FilteredCategories(currentTheme, language) {
    const groupedItems = sitemapMenus?.reduce((acc, item) => {
      const parentId = item.menu_item_parent || "0"; // Use '0' for top-level items
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(item);
      return acc;
    }, {});

    return (
      <div
        className={`[&>*]:text-${currentTheme}-100 md:flex md:justify-evenly  grid grid-cols-2 md:gap-[60px]`}>
        {sitemapMenus &&
          groupedItems["0"]?.map((item) => (
            <div key={item.ID}>
              <Link
                href={catUrl(item.post_title, language)}
                className={`text-${currentTheme}-100 text-[15px] font-semibold uppercase mb-[24px] block`}>
                {language === "en" ? item?.title : item?.acf?.arabic}
              </Link>

              {/* Check for child items */}
              {groupedItems[item.ID] && (
                <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                  {groupedItems[item.ID].map((childItem) => (
                    <li key={childItem.ID}>
                      <Link
                        onClick={() => {
                          setThemeLayout(
                            query.category?.replace(/-/g, "-").toLowerCase()
                          );
                        }}
                        aria-label={childItem.post_title}
                        title={childItem.post_title}
                        href={catUrlWithSubCat(
                          item.post_title,
                          childItem.post_title,
                          language
                        )}
                        className={`text-${currentTheme}-100 hover:opacity-50`}>
                        {language === "en"
                          ? childItem?.title
                          : childItem?.acf?.arabic}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    );
  }

  const FilteredCategoriesAccordin = () => {
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
              }}
              aria-label={item?.post_title}
              title={item?.post_title}
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
              <div className="collapse-title p-0 min-h-0">
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
                      }}
                      aria-label={childItem?.post_title}
                      title={childItem?.post_title}
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

  const Copyrights = (theme) => {
    return (
      <>
        {theme && (
          <p className={`text-${theme}-100`}>
            © {year}{" "}
            {transalateText(
              siteTransalations?.generalTranslations?.all_rights_reserved,
              language
            )}
          </p>
        )}
        {!theme && (
          <p>
            © {year}{" "}
            {transalateText(
              siteTransalations?.generalTranslations?.all_rights_reserved,
              language
            )}
          </p>
        )}
      </>
    );
  };

  function Navigations() {
    return (
      <>
        <h4 className="text-[15px] font-semibold uppercase mb-[24px]">
          {transalateText(
            siteTransalations?.generalTranslations?.sitemap,
            language
          )}
        </h4>
        <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
          <Link
            aria-label="Home"
            title="Home"
            href={`${frontendUrl}`}
            className="hover:opacity-50">
            {transalateText(
              siteTransalations?.generalTranslations?.home,
              language
            )}
          </Link>
          {footerMenus &&
            footerMenus.map((item, key) => {
              return (
                <li key={key}>
                  <Link
                    aria-label={item?.title}
                    title={item?.title}
                    href={`/${item?.title
                      ?.replace(/-ar/g, "")
                      .replace(/-en/g, "")
                      .replace(/-/g, "-")
                      .toLowerCase()}/`}
                    className="hover:opacity-50">
                    {language === "en" ? item?.title : item?.acf?.arabic}
                  </Link>
                </li>
              );
            })}
        </ul>
      </>
    );
  }

  function NavigationsMobile() {
    return (
      <>
        <Link
          aria-label="Home"
          title="Home"
          href={`${frontendUrl}/${language}`}
          className="hover:bg-transparent">
          {transalateText(
            siteTransalations?.generalTranslations?.home,
            language
          )}
        </Link>

        <div className="accordion grid gap-[24px]">
          {FilteredCategoriesAccordin()}
        </div>

        {footerMenus &&
          footerMenus.map((item, key) => {
            return (
              <Link
                key={key}
                aria-label={item?.title}
                title={item?.title}
                href={`/${item?.title
                  ?.replace(/-ar/g, "")
                  .replace(/-en/g, "")
                  .replace(/-/g, "-")
                  .toLowerCase()}/${language}`}
                className="hover:opacity-50">
                {language === "en" ? item?.title : item?.acf?.arabic}
              </Link>
            );
          })}
      </>
    );
  }

  function socialLinks() {
    return (
      <>
        <ul className="sm:[&>*]:text-[14px] text-[12px] flex sm:gap-[20px] gap-[10px] [&>*]:transition-all">
          <li>
            {contactData && (
              <Link
                aria-label="facebook"
                title="facebook"
                href={
                  contactData[0]?.acf?.facebook == null
                    ? "#"
                    : contactData[0]?.acf?.facebook
                }
                className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
                target="_blank">
                {transalateText(
                  siteTransalations?.generalTranslations?.facebook,
                  language
                )}
              </Link>
            )}
          </li>

          <li>
            {contactData && (
              <Link
                aria-label="instagram"
                title="instagram"
                href={
                  contactData[0]?.acf?.instagram == null
                    ? "#"
                    : contactData[0]?.acf?.instagram
                }
                className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
                target="_blank">
                {transalateText(
                  siteTransalations?.generalTranslations?.instagram,
                  language
                )}
              </Link>
            )}
          </li>
          <li>
            {contactData && (
              <Link
                aria-label="snapchat"
                title="snapchat"
                href={
                  contactData[0]?.acf?.snapchat == null
                    ? "#"
                    : contactData[0]?.acf?.snapchat
                }
                className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
                target="_blank">
                {transalateText(
                  siteTransalations?.generalTranslations?.snapchat,
                  language
                )}
              </Link>
            )}
          </li>
        </ul>
      </>
    );
  }

  function footerInfo() {
    return (
      <>
        <Logo
          url={`/`}
          alt={"Chuchoter Logo"}
          logoTitle={"Chuchoter Logo"}
          theme="#c89a3f"
        />
        <h4 className="mt-[10px] font-semibold">
          {languageText(
            contactData && contactData[0]?.acf?.footer_heading,
            contactData && contactData[1]?.acf?.footer_heading,
            language,
            "no"
          )}
        </h4>
        <p>
          {languageText(
            contactData && contactData[0]?.acf?.footer_description,
            contactData && contactData[1]?.acf?.footer_description,
            language,
            "no"
          )}
        </p>
      </>
    );
  }

  function homeFooter() {
    return (
      <>
        <footer
          className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden`}>
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid sm:gap-[50px] gap-[30px]">
            <div className="md:flex md:justify-between md:gap-[50px] grid grid-cols-3 gap-[30px]">
              <div className="max-w-[50%] grid gap-[10px]">{footerInfo()}</div>
              <div>{Navigations()}</div>
              {FilteredCategories(currentTheme, language)}
            </div>
            <div
              className={`${
                page == "home2"
                  ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                  : "border-black"
              } sm:flex grid justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
              <div>{Copyrights()}</div>
              <div>{socialLinks()}</div>
            </div>
          </div>
        </footer>

        <footer
          className={`lg:hidden bg-events-900 border-events-100 [&>*]:text-events-100  container border-t border-solid  pt-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
          <div className="grid gap-[20px]">{NavigationsMobile()}</div>

          <div
            className={`${
              page == "home"
                ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                : "border-black"
            } sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
            <div className="order-2 sm:order-1">{Copyrights()}</div>
            <div className="order-1 sm:order-2">{socialLinks()}</div>
          </div>
        </footer>
      </>
    );
  }

  function home2Footer() {
    return (
      <>
        <footer
          className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden `}>
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
            <div className="md:flex md:justify-between md:gap-[50px] grid grid-cols-3 gap-[30px]">
              <div className="max-w-[50%] grid gap-[10px]">{footerInfo()}</div>
              <div>{Navigations()}</div>
              {FilteredCategories(currentTheme, language)}
            </div>
            <div
              className={`${
                page == "home2" ? "" : "border-black"
              } flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
              <div>{Copyrights()}</div>
              <div>{socialLinks()}</div>
            </div>
          </div>
        </footer>

        <footer
          className={`lg:hidden  container border-t border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
          <div className="grid  gap-[24px]">{NavigationsMobile()}</div>

          <div
            className={`${
              page == "home"
                ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                : "border-black"
            } sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
            <div className="order-2 sm:order-1">{Copyrights()}</div>
            <div className="order-1 sm:order-2">{socialLinks()}</div>
          </div>
        </footer>
      </>
    );
  }

  function normalFooter() {
    return (
      <>
        <footer
          className={`container border-t border-${currentTheme}-100 border-solid md:py-[70px] py-[50px] lg:block hidden`}>
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
            <div className="md:flex md:justify-between md:gap-[50px] grid grid-cols-3 gap-[30px]">
              <div className="max-w-[50%] grid gap-[10px]">{footerInfo()}</div>
              <div>{Navigations()}</div>
              {FilteredCategories(currentTheme, language)}
            </div>
            <div
              className={`${
                page == "home2"
                  ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                  : "border-black"
              } flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
              <div>{Copyrights()}</div>
              <div>{socialLinks()}</div>
            </div>
          </div>
        </footer>

        <footer
          className={`lg:hidden container border-t border-black border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
          <div className="grid  gap-[24px]">{NavigationsMobile()}</div>
          <div
            className={`${
              page == "home"
                ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                : "border-black"
            } sm:flex grid gap-[10px] justify-between border-t border-solid  pt-[20px] mt-[20px]`}>
            <div className="order-2 sm:order-1">{Copyrights()}</div>
            <div className="order-1 sm:order-2">{socialLinks()}</div>
          </div>
        </footer>
      </>
    );
  }

  function catFooter() {
    return (
      <>
        <footer
          className={`container border-t border-${currentTheme}-100 border-solid md:py-[70px] py-[50px] lg:block hidden`}>
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
            <div className="md:flex md:justify-between md:gap-[50px] grid grid-cols-3 gap-[30px]">
              <div className="max-w-[50%] grid gap-[10px]">{footerInfo()}</div>
              <div>{Navigations()}</div>
              {FilteredCategories(currentTheme, language)}
            </div>
            <div
              className={`${
                page == "home2"
                  ? "bg-events-900 border-events-100 [&>*]:text-events-100"
                  : `border-${currentTheme}-100`
              } flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
              <div>{Copyrights(currentTheme)}</div>
              <div>{socialLinks()}</div>
            </div>
          </div>
        </footer>
        <BottomNav />
      </>
    );
  }

  let footerType;
  switch (page) {
    case "home":
      footerType = homeFooter();
      break;
    case "home2":
      footerType = home2Footer();
      break;
    case "category":
      footerType = catFooter();
      break;
    default:
      footerType = normalFooter();
      break;
  }

  return <>{footerType}</>;
}
