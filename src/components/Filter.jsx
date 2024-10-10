import { useThemeContext } from "@/context/themeContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilterProducts() {
  const router = useRouter();
  const { themeLayout } = useThemeContext();

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
    router.push({
      pathname: router.pathname,
      query: { ...router.query, minPrice: newMinPrice },
    }, undefined, { shallow: false });
  };

  // Handle review count change
  const handleReviewChange = (event) => {
    const newMinReviewCount = parseInt(event.target.value, 10);
    setMinReviewCount(newMinReviewCount);

    // Update URL with new minReviewCount
    router.push({
      pathname: router.pathname,
      query: { ...router.query, minReviewCount: newMinReviewCount },
    }, undefined, { shallow: false });
  };

  let color;
  switch (themeLayout.toLowerCase()) {
    case "white":
      color = "white";
      break;
    case 'chocolates':
      color = "#c89a3f";
      break;
    case 'flowers':
      color = "#E62263";
      break;
    case 'cakes':
      color = "#E79F02";
      break;
    case 'events':
      color = "#258F89";
      break;
    default:
      color = "#c89a3f";
      break;
  }

  return (
    <>
      <div className="px-[16px] pt-[20px] pb-[24px] grid gap-[24px] border-b border-gray-200 border-solid items-start justify-start [&>*]:text-[15px]">
        <span className="block uppercase font-semibold text-[13px]">Price</span>
        <ul className="grid gap-[12px]">
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${themeLayout.toLowerCase()}-100`}
              name="minPrice"
              value="0"
              checked={minPrice === 0}
              onChange={handlePriceChange}
            />
            All
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${themeLayout.toLowerCase()}-100`}
              name="minPrice"
              value="100"
              checked={minPrice === 100}
              onChange={handlePriceChange}
            />
            100 +
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${themeLayout.toLowerCase()}-100`}
              name="minPrice"
              value="500"
              checked={minPrice === 500}
              onChange={handlePriceChange}
            />
            500 +
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${themeLayout.toLowerCase()}-100`}
              name="minPrice"
              value="1000"
              checked={minPrice === 1000}
              onChange={handlePriceChange}
            />
            1000 +
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className={`radio w-[18px] h-[18px] checked:bg-${themeLayout.toLowerCase()}-100`}
              name="minPrice"
              value="1500"
              checked={minPrice === 1500}
              onChange={handlePriceChange}
            />
            1500 +
          </li>
        </ul>
      </div>

      <div className="px-[16px] pt-[20px] pb-[24px] grid gap-[24px] border-b border-gray-200 border-solid items-start justify-start [&>*]:text-[15px]">
        <span className="block uppercase font-semibold text-[13px]">Rating</span>
        <ul className="grid gap-[12px]">
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className='radio w-[18px] h-[18px]'
              name="minReviewCount"
              value="0"
              checked={minReviewCount === 0}
              onChange={handleReviewChange}
            />
            All
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className='radio w-[18px] h-[18px]'
              name="minReviewCount"
              value="3"
              checked={minReviewCount === 3}
              onChange={handleReviewChange}
            />
            3
            <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="none" viewBox="0 0 69 13">
              <path fill={color} d="m6.5.5 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35L.318 4.99l4.455-.368L6.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L20.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L34.5.5Z" />
              <path fill="#E2DFDA" fill-opacity=".5" d="m48.5.5 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L48.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L62.5.5Z" />
            </svg>
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className='radio w-[18px] h-[18px]'
              name="minReviewCount"
              value="4"
              checked={minReviewCount === 4}
              onChange={handleReviewChange}
            />
            4
            <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="none" viewBox="0 0 69 13">
              <path fill={color} d="m6.5.5 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35L.318 4.99l4.455-.368L6.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L20.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L34.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L48.5.5Z" />
              <path fill="#E2DFDA" fill-opacity=".5" d="m62.5.5 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L62.5.5Z" />
            </svg>
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              className='radio w-[18px] h-[18px]'
              name="minReviewCount"
              value="5"
              checked={minReviewCount === 5}
              onChange={handleReviewChange}
            />
            5
            <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="none" viewBox="0 0 69 13">
              <path fill={color} d="m6.5.5 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35L.318 4.99l4.455-.368L6.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L20.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L34.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L48.5.5Zm14 0 1.727 4.123 4.455.368-3.388 2.917 1.027 4.35-3.82-2.32-3.821 2.32 1.026-4.35-3.388-2.917 4.455-.368L62.5.5Z" />
            </svg>
          </li>
        </ul>
      </div>
    </>
  );
}