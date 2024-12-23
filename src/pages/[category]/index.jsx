import { useRouter } from "next/router";
import { frontendUrl, paginationUrl, wordpressRestApiUrlWoocommerceCustom } from "@/utils/variables";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";
import { useTranslation } from "next-i18next";
import Category from "@/components/Cateogary";
import Loading from "@/components/Loading";

export default function AllProducts({ products, currentPage, totalCount, tagedProducts, tags }) {
  const router = useRouter();
  const { query } = router;
  const { i18n } = useTranslation();
  const [cachedData, setCachedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const allProducts = products?.products ?? [];
  const totalPages = Math.ceil(totalCount / 30);
  const { language } = useLanguageContext();
  const { subCategoryData } = useSiteContext();

  // Cache duration in milliseconds (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const CACHE_DURATION = 24 * 60 * 60 * 1000;

  // Maximum number of items to store in sessionStorage
  const MAX_CACHE_ITEMS = 5;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const categoryKey = query.category || "default";
      const subCategoryKey = query.sub_category || "default";
      const pageKey = query.page || 1;

      const cacheKey = `productsData_${categoryKey}_${subCategoryKey}_${pageKey}`;
      const sessionData = sessionStorage.getItem(cacheKey);
      const currentTime = new Date().getTime();

      if (sessionData) {
        const parsedData = JSON.parse(sessionData);

        if (currentTime - parsedData.timestamp < CACHE_DURATION) {
          setCachedData(parsedData.data);
          setIsLoading(false);
        } else {
          fetchDataAndUpdateCache(pageKey);
        }
      } else {
        fetchDataAndUpdateCache(pageKey);
      }
    }
  }, [query.page, query.category, query.sub_category]);

  const fetchDataAndUpdateCache = (page) => {
    setIsLoading(true);
    const dataToStore = { products: products?.products ?? [], currentPage, totalCount, tagedProducts, tags };

    const categoryKey = query.category || "default";
    const subCategoryKey = query.sub_category || "default";
    const pageKey = query.page || 1;

    const cacheKey = `productsData_${categoryKey}_${subCategoryKey}_${pageKey}`;
    const dataWithTimestamp = { timestamp: new Date().getTime(), data: dataToStore };

    // First, check the number of cached items in sessionStorage
    const cacheKeys = Object.keys(sessionStorage);
    const cacheItemCount = cacheKeys.length;

    if (cacheItemCount >= MAX_CACHE_ITEMS) {
      // Remove the oldest cached item if we exceed the max cache size
      let oldestKey = null;
      let oldestTimestamp = Infinity;

      cacheKeys.forEach((key) => {
        const cachedItem = JSON.parse(sessionStorage.getItem(key));
        if (cachedItem && cachedItem.timestamp < oldestTimestamp) {
          oldestTimestamp = cachedItem.timestamp;
          oldestKey = key;
        }
      });

      // Remove the oldest item from sessionStorage
      if (oldestKey) {
        sessionStorage.removeItem(oldestKey);
      }
    }

    // Store the new item in sessionStorage
    sessionStorage.setItem(cacheKey, JSON.stringify(dataWithTimestamp));

    // Update the state with the new data
    setCachedData(dataToStore);
    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    router.push({ pathname: router.pathname, query: { ...router.query, page } });
  };

  const handleCategoryChange = (category) => {
    router.push(paginationUrl(category, query.sub_category, 1));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading spinner />
      </div>
    );
  }

  const { products: allProductsCached, totalCount: totalProductsCached } = cachedData || {};

  return (
    <Layout page="category" tags={tags && tags} showHeadingTag={!query.tag}>
      <div className="container grid xl:gap-[50px] gap-[30px] lg:pt-[30px] xl:pb-[70px] pb-[20px] overflow-hidden">
        <Category
          pageHeaderData={subCategoryData}
          cateogaryData={query.tag === "yes" ? tagedProducts : allProductsCached}
          cateogaryCurrentPage={currentPage}
          cateogaryTotalPages={totalPages}
          cateogaryOnPageChange={handlePageChange}
          cateogaryProductsPerPage={30}
          cateogaryMainCat={query.category}
          cateogaryTotalCount={totalCount}
          cateogaryCurrenPageNumber={query.page}
          tags={tags}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </Layout>
  );
}

// Server-side data fetching
export async function getServerSideProps(context) {
  const { page = 1, minPrice, minReviewCount, category: mainCat, sub_category: subCat, tag } = context.query;
  const category = subCat || mainCat;
  const categoryList = category?.split(",");
  const tagList = tag?.split(",");

  try {
    const productRequests = [
      axios.get(`${frontendUrl}/api/products`, {
        params: { page, per_page: 30, min_price: minPrice, reviews_count: minReviewCount, category: categoryList?.join(","), tag: tagList?.join(",") },
      }),
      axios.get(`${frontendUrl}/api/totalproductCount`, {
        params: { categories: categoryList?.join(",") },
      }),
    ];

    if (tagList?.length > 0) {
      productRequests.push(
        fetch(`${wordpressRestApiUrlWoocommerceCustom}products?tag=${tagList.join(",")}`).then((res) => res.json()),
        axios.get(`${frontendUrl}/api/tags`)
      );
    }

    const [productsRes, totalCountRes, tagedProductsRes = [], tagsRes = { data: [] }] = await Promise.all(productRequests);

    return {
      props: {
        products: productsRes.data,
        currentPage: Number(page),
        totalCount: totalCountRes.data.total_count,
        tagedProducts: tagedProductsRes,
        tags: tagsRes.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);

    return {
      props: {
        products: [],
        currentPage: 1,
        totalCount: 0,
        tagedProducts: [],
        tags: [],
      },
    };
  }
}
