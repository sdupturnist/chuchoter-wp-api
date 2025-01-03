import { useThemeContext } from "@/context/themeContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useLanguageContext } from "@/context/LanguageContext";
import { colorTheme, transalateText } from "@/utils/variables";
import { useSiteContext } from "@/context/siteContext";

export default function FilterProducts() {
  const router = useRouter();
  const { themeLayout } = useThemeContext();
  const currentTheme = themeLayout?.toString().toLowerCase();
  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();

  const color = colorTheme(currentTheme);

  //console.log(currentTheme)

  const [minPrice, setMinPrice] = useState(0);
  const [minReviewCount, setMinReviewCount] = useState(1); // Default to 1 review

  // Update state when query parameters change
  useEffect(() => {
    if (router.query.minPrice) {
      setMinPrice(parseFloat(router.query.minPrice));
    }
    if (router.query.minReviewCount) {
      setMinReviewCount(parseInt(router.query.minReviewCount, 10));
    }
  }, [router.query.minPrice, router.query.minReviewCount]);

  // Handle minimum price change
  const handlePriceChange = (event) => {
    const newMinPrice = parseFloat(event.target.value);
    setMinPrice(newMinPrice);

    // Update URL with new minPrice
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, minPrice: newMinPrice },
      },
      undefined,
      { shallow: false }
    );
  };

  // Handle review count change
  const handleReviewChange = (event) => {
    const newMinReviewCount = parseInt(event.target.value, 10);
    setMinReviewCount(newMinReviewCount);

    // Update URL with new minReviewCount
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, minReviewCount: newMinReviewCount },
      },
      undefined,
      { shallow: false }
    );
  };

  return (
    <>
      <div
        className={`px-[16px] pt-[20px] pb-[24px] grid gap-[24px] border-b border-gray-200 border-solid items-start justify-start [&>*]:text-[15px] [&>*]:`}>
        <span
          className={`block uppercase font-semibold text-[13px] `} style={{color: color}}>
          {transalateText(
            siteTransalations?.generalTranslations?.price,
            language
          )}
        </span>
        <ul className="grid gap-[12px]">
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minPrice"
              value="0"
              checked={minPrice === 0}
              onChange={handlePriceChange}
            />

            {transalateText(
              siteTransalations?.generalTranslations?.all,
              language
            )}
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}
            >
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minPrice"
              value="100"
              checked={minPrice === 100}
              onChange={handlePriceChange}
            />
            100 +
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minPrice"
              value="500"
              checked={minPrice === 500}
              onChange={handlePriceChange}
            />
            500 +
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minPrice"
              value="1000"
              checked={minPrice === 1000}
              onChange={handlePriceChange}
            />
            1000 +
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minPrice"
              value="1500"
              checked={minPrice === 1500}
              onChange={handlePriceChange}
            />
            1500 +
          </li>
        </ul>
      </div>

      <div
        className={`px-[16px] pt-[20px] pb-[24px] grid gap-[24px] border-b border-gray-200 border-solid items-start justify-start [&>*]:text-[15px] [&>*]:`}>
        <span
          className={`block uppercase font-semibold text-[13px] `} style={{color: color}}>
          {transalateText(
            siteTransalations?.generalTranslations?.rating,
            language
          )}
        </span>
        <ul className="grid gap-[12px]">
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="0"
              checked={minReviewCount === 0}
              onChange={handleReviewChange}
            />
            {transalateText(
              siteTransalations?.generalTranslations?.all,
              language
            )}
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="1"
              checked={minReviewCount === 1}
              onChange={handleReviewChange}
            />
            <div className="flex gap-[3px]">
              <StarIcon className={` size-[20px]`} />
              <StarIcon
                className={` size-[20px] opacity-30`}
              />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
            </div>
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="2"
              checked={minReviewCount === 2}
              onChange={handleReviewChange}
            />
            <div className="flex gap-[3px]">
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
              <StarIcon
                className={` size-[20px]  opacity-30`}
              />
            </div>
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="3"
              checked={minReviewCount === 3}
              onChange={handleReviewChange}
            />
            <div className="flex gap-[3px]">
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon
                className={` size-[20px] opacity-30`}
              />
              <StarIcon
                className={` size-[20px] opacity-30`}
              />
            </div>
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="4"
              checked={minReviewCount === 4}
              onChange={handleReviewChange}
            />
            <div className="flex gap-[3px]">
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon
                className={` size-[20px] opacity-30`}
              />
            </div>
          </li>
          <li
            className={`flex justify-start items-center gap-2 `} style={{color: color}}>
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${currentTheme}-100`}
              name="minReviewCount"
              value="5"
              checked={minReviewCount === 5}
              onChange={handleReviewChange}
            />
            <div className="flex gap-[3px]">
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
              <StarIcon className={` size-[20px]`} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
