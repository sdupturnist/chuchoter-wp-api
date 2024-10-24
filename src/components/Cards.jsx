import Images from "@/components/Images";
import { useThemeContext } from "@/context/themeContext";
import Link from "next/link";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import {
  colorTheme,
  frontendUrl,
  itemUrl,
  languageText,
  transalateText,
} from "@/utils/variables";
import { truncateWords } from "@/utils/TruncateWords";
import { AOSInit } from "./Aos";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";

export default function Card({ theme, desc, type, item, subCat, mainCat }) {
  const review = item?.acf?.user_reviews;

  const { siteTransalations } = useSiteContext();

  const { language } = useLanguageContext();

  const { themeLayout } = useThemeContext();
  const currentTheme = themeLayout.toString().toLowerCase();
  const color = colorTheme(currentTheme);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (item) {
      setIsLoading(false);
    }
  }, [item]);

  let cardType;
  switch (type) {
    //CATEOFARY PAGE CARDS
    case "cat":
      cardType = (
        <>
          {isLoading ? (
            <div className="grid gap-[12px]">
              <div className="skeleton rounded-[10px] aspect-square 2xl:min-w-[170px]"></div>
              <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
              <div className="skeleton h-4 w-full rounded-[10px]"></div>
              <div className="skeleton h-4 w-full rounded-[10px]"></div>
            </div>
          ) : (
            <>
              <AOSInit />
              <div
                data-aos="fade-up"
                className={`[&>*]:text-${currentTheme}-100 grid gap-[10px] w-full card-cat sm:mb-[10px] mb-2`}
                data-id={item?.id ?? null}
                data-review={review?.length}>
                <div className="relative overflow-hidden">
                  <Link
                    className="block"
                    href={`${itemUrl(mainCat, item?.slug)}`}>
                    <Images
                      width="170"
                      height="170"
                      quality={100}
                      placeholder={true}
                      imageurl={item?.images && item?.images}
                      classes={
                        "w-full object-cover rounded-[10px] aspect-square 2xl:min-w-[170px]"
                      }
                      alt={item?.images?.alt ?? "Product"}
                      title={item?.images?.alt ?? "Product"}
                    />
                  </Link>

                  <Cart
                    itemid={item?.id ?? null}
                    type="button"
                    price={
                      item?.sale_price || item?.price || item?.regular_price
                    }
                    name={item?.name}
                  />
                </div>
                <div className="grid gap-[7px] mt-[2px]">
                  <Link
                    className="block"
                    href={`${itemUrl(mainCat, item?.slug)}`}>
                    <h4
                      className={`text-${currentTheme}-100 text-[14px] first-letter:capitalize lowercase`}>
                      {languageText(
                        item?.name,
                        item?.acf?.title_arabic,
                        language,
                        "no"
                      )}
                    </h4>
                  </Link>

                  {/* {!desc == true ? (
                    <span
                      className={`text-${currentTheme}-100 block text-[12px]  text-opacity-80 capitalize`}>
                      {languageText(
                        item?.categories.map((item) => item.name),
                        item?.categories.map((item) => item.arabic_label),
                        language,
                        "yes"
                      )}
                    </span>
                  ) : null} */}
                  {type == true ? (
                    <p
                      className={`text-${currentTheme}-100 text-[12px] leading-[20px] text-opacity-80`}>
                      {" "}
                      {truncateWords(
                        item?.short_description ?? null ?? null,
                        20
                      )}
                    </p>
                  ) : null}
                </div>
                {review?.length > 0 ? (
                  <>
                    <span className="flex gap-[6px] text-[12px] text-black text-opacity-80 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        className="mb-[3px]"
                        height="12"
                        fill="none"
                        viewBox="0 0 13 13">
                        <path
                          fill={"#c89a3f"}
                          d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z"
                        />
                      </svg>
                      {review?.length}{" "}
                      {transalateText(
                        siteTransalations?.generalTranslations?.review,
                        language
                      )}
                    </span>
                  </>
                ) : null}

                {item?.regular_price && (
                  <span className={`text-${currentTheme}-100 flex gap-[8px]`}>
                    {item?.sale_price && (
                      <del className="text-[14px] font-light">
                        {item?.regular_price}{" "}
                        {transalateText(
                          siteTransalations?.generalTranslations.qr,
                          language
                        )}
                      </del>
                    )}

                    <span className="text-[14px] font-semibold">
                      {item?.sale_price || item?.price}
                      {!item?.sale_price ||
                        (!item?.price && (
                          <span>{item?.regular_price ?? null}</span>
                        ))}{" "}
                      {transalateText(
                        siteTransalations?.generalTranslations.qr,
                        language
                      )}
                      <span className="text-[11px] font-light uppercase">
                        /{" "}
                        {languageText(
                          item?.acf?.unit,
                          item?.acf?.unit_arabic,
                          language,
                          "no"
                        )}
                      </span>
                    </span>
                  </span>
                )}
                <div className="xl:hidden mt-[4px]">
                  <Cart
                    itemid={item?.id ?? null}
                    type="button-small"
                    price={
                      item?.sale_price || item?.price || item?.regular_price
                    }
                    name={item?.name}
                  />
                </div>
              </div>
            </>
          )}
        </>
      );
      break;

    case "blog":
      cardType = (
        <>
          {isLoading ? (
            <>
              <div className="skeleton h-32 w-full sm:min-h-[380px]"></div>
              <div className="skeleton h-4 w-[80%]"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-[30%]"></div>
            </>
          ) : (
            <>
              <AOSInit />
              <Link
                data-aos="fade-up"
                href={`${frontendUrl}/blogs/${
                  item && item?.title?.rendered.toLowerCase().replace(/ /g, "-")
                }`}
                className="grid gap-[20px]">
                {item?.fea_data && (
                  <Images
                    width="500"
                    height="400"
                    quality={100}
                    placeholder={true}
                    imageurl={item?.fea_data?.url ? item?.fea_data?.url : ""} // Provide a fallback URL
                    classes={
                      "mx-auto w-full block rounded-[8px] object-cover sm:min-h-[380px] sm:max-h-[380px]"
                    }
                    alt={item?.fea_data?.alt || "Default alt text"} // Provide a default alt text
                    title={item?.fea_data?.alt || "Default title text"} // Provide a default title text
                  />
                )}

                <div className="grid gap-[15px]">
                  <h2 className="font-semibold text-[20px]">
                    {item && item.title?.rendered}
                  </h2>
                  <div
                    className="[&>*]:mb-[20px]"
                    dangerouslySetInnerHTML={{
                      __html: truncateWords(
                        item?.content?.rendered ?? null,
                        30
                      ),
                    }}
                  />
                </div>
              </Link>
            </>
          )}
        </>
      );
      break;

    default:
      cardType = (
        <div
          className={`grid gap-[10px] w-full card-cat sm:mb-[10px] max-w-[190px] ${
            language == "en" ? "[&>*]:text-start" : "[&>*]:text-end"
          }`}
          data-id={item?.id ?? null}
          data-review={review?.length}>
          <div className="relative overflow-hidden">
            <Link className="block" href={`${itemUrl(mainCat, item?.slug)}`}>
              <Images
                width="170"
                height="170"
                quality={100}
                placeholder={true}
                imageurl={item?.images && item?.images}
                classes={
                  "w-full object-cover rounded-[10px] aspect-square 2xl:min-w-[170px]"
                }
                alt={item?.images?.alt ?? "Product"}
                title={item?.images?.alt ?? "Product"}
              />
            </Link>

            <Cart
              itemid={item?.id ?? null}
              type="button"
              price={item?.sale_price || item?.price || item?.regular_price}
              name={item?.name}
            />
          </div>
          <div className="grid gap-[7px] mt-[2px]">
            <Link className="block" href={`${itemUrl(mainCat, item?.slug)}`}>
              <h4
                className={`text-${currentTheme}-100 text-[14px] first-letter:capitalize lowercase !leading-[1.5] mb-[2px]`}>
                {languageText(
                  item?.name,
                  item?.acf?.title_arabic,
                  language,
                  "no"
                )}
              </h4>
            </Link>
            {/* 
            {!desc == true ? (
              <span
                className={`text-${currentTheme}-100 block text-[12px]  text-opacity-80 capitalize !leading-[1.5]`}>
                {languageText(
                  item?.categories.map((item) => item.name),
                  item?.categories.map((item) => item.arabic_label),
                  language,
                  "yes"
                )}
              </span>
            ) : null} */}
            {type == true ? (
              <p
                className={`text-${currentTheme}-100 text-[12px] leading-[20px] text-opacity-80`}>
                {" "}
                {truncateWords(item?.short_description ?? null ?? null, 20)}
              </p>
            ) : null}
          </div>
          {review?.length > 0 ? (
            <>
              <span className="flex gap-[6px] text-[12px] text-black text-opacity-80 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  className="mb-[3px]"
                  height="12"
                  fill="none"
                  viewBox="0 0 13 13">
                  <path
                    fill={"#c89a3f"}
                    d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z"
                  />
                </svg>
                {review?.length}{" "}
                {transalateText(
                  siteTransalations?.generalTranslations?.review,
                  language
                )}
              </span>
            </>
          ) : null}

          {item?.regular_price && (
            <span className={`text-${currentTheme}-100 flex gap-[8px]`}>
              {item?.sale_price && (
                <del className="text-[14px] font-light">
                  {item?.regular_price}{" "}
                  {transalateText(
                    siteTransalations?.generalTranslations.qr,
                    language
                  )}
                </del>
              )}

              <span className="text-[14px] font-semibold">
                {item?.sale_price || item?.price}
                {!item?.sale_price ||
                  (!item?.price && (
                    <span>{item?.regular_price ?? null}</span>
                  ))}{" "}
                {transalateText(
                  siteTransalations?.generalTranslations.qr,
                  language
                )}
                <span className="text-[11px] font-light uppercase">
                  /{" "}
                  {languageText(
                    item?.acf?.unit,
                    item?.acf?.unit_arabic,
                    language,
                    "no"
                  )}
                </span>
              </span>
            </span>
          )}
          <div className="xl:hidden mt-[4px]">
            <Cart
              itemid={item?.id ?? null}
              type="button-small"
              price={item?.sale_price || item?.price || item?.regular_price}
              name={item?.name}
            />
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      <>{cardType}</>
    </>
  );
}
