import { useRouter } from "next/router";
import {
  frontendUrl,
  paginationUrl,
  wordpressRestApiUrlWoocommerceCustom,
} from "@/utils/variables";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";
import { useTranslation } from "next-i18next";
import Category from "@/components/Cateogary";

export default function AllProducts({
  products,
  currentPage,
  totalCount,
  tagedProducts,
  tags,
}) {
  const router = useRouter();
  const { query } = router;

  const { i18n } = useTranslation();

  const allProducts = products?.products ?? [];
  const totalProducts = totalCount;
  const productsPerPage = 30;
  const totalPages = Math.ceil(totalCount / productsPerPage);

  const { language } = useLanguageContext();

  const { subCategoryData } = useSiteContext();

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);

  const handlePageChange = (page) => {
    router.push(paginationUrl(query.category, query.sub_category, page));
  };

  return (
    <>
      {/* {pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
            <Metatags seo={pageData_?.data?.subCategorie?.data[0]?.attributes?.seo} />
          )}
          {!pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
            <Metatags seo={pageDataMainCatSeo_?.data?.mainCategories?.data[0]?.attributes?.seo} />
          )} */}

      <Layout
        page="category"
        tags={tags && tags}
        showHeadingTag={query.tag ? false : true}>
        <div className="container [&>*]:text-black grid xl:gap-[50px] gap-[30px] lg:pt-[30px] xl:pb-[70px] pb-[20px] overflow-hidden">
          <Category
            pageHeaderData={subCategoryData && subCategoryData}
            cateogaryData={query?.tag === "yes" ? tagedProducts : allProducts}
            cateogaryCurrentPage={currentPage}
            cateogaryTotalPages={totalPages}
            cateogaryOnPageChange={handlePageChange}
            cateogaryProductsPerPage={productsPerPage}
            cateogaryMainCat={query.category}
            cateogaryTotalCount={totalCount}
            cateogaryCurrenPageNumber={query.page}
            tags={tags && tags}
          />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // Destructure query params with defaults
  const {
    page = 1,
    minPrice,
    minReviewCount,
    category: mainCat,
    sub_category: subCat,
  } = context.query;

  // Ensure categories are handled correctly
  const category = subCat || mainCat;

  try {
    // Fetch products
    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        page,
        per_page: 30, // Adjust this if needed
        min_price: minPrice,
        reviews_count: minReviewCount,
        category: category?.replace(/-/g, " "), // Handle categories with hyphens, if necessary
      },
    });

    // Fetch total product count
    const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`, {
      params: {
        categories: category?.replace(/-/g, " "), // Ensure categories format is correct
      },
    });

    const tagedProductsData = await fetch(
      `${wordpressRestApiUrlWoocommerceCustom}products/tag/${context.query.category}`
    );

    const tagedProductsData_ = await tagedProductsData.json();

    const allTagRes = await axios.get(`${frontendUrl}/api/tags`);

    return {
      props: {
        products: res.data,
        currentPage: Number(page),
        totalCount: resCount.data.total_count,
        tagedProducts: tagedProductsData_,
        tags: allTagRes.data,
      },
    };
  } catch (error) {
    // Log more error details for easier debugging
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );

    return {
      props: {
        products: [],
        currentPage: 1,
        totalCount: 0,
      },
    };
  }
}
