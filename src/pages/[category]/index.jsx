import { useRouter } from "next/router";
import {
  frontendUrl,
  paginationUrl,
  wordpressRestApiUrlWoocommerceCustom,
} from "@/utils/variables";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import Metatags from "@/components/Seo";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";
import ProductListing from "@/components/ProductListing";
import { useTranslation } from "next-i18next";

export default function AllProducts({
  products,
  currentPage,
  totalCount,
  test,
}) {
  const router = useRouter();
  const { query } = router;

  const { i18n } = useTranslation();

  const allProducts = products?.products ?? [];
  const totalProducts = totalCount;
  const productsPerPage = 30;
  const totalPages = parseInt(totalProducts / productsPerPage);

  const { language } = useLanguageContext();

  const { subCategoryData } = useSiteContext();

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);

  const handlePageChange = (page) => {
    router.push(paginationUrl("chocolates", page));
  };

  return (
    <>
      {/* {pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
            <Metatags seo={pageData_?.data?.subCategorie?.data[0]?.attributes?.seo} />
          )}
          {!pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
            <Metatags seo={pageDataMainCatSeo_?.data?.mainCategories?.data[0]?.attributes?.seo} />
          )} */}

      <Layout page="category">
        <div className="container [&>*]:text-black grid xl:gap-[50px] gap-[30px] lg:pt-[30px] xl:pb-[70px] pb-[20px] overflow-hidden">
          <PageHeader
            type="cat"
            catcount={5}
            title={query.category || ""}
            mainCat={query.category}
            //subCat={query.main_categories}
            data={subCategoryData && subCategoryData}
          />
          <ProductListing
            data={allProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            productsPerPage={productsPerPage}
            mainCat={query.category}
            totalCount={totalCount}
            currenPageNumber={query.page}
          />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // Destructure query params
  const { page = 1 } = context.query; // Default to page 1
  const minPrice = context.query.minPrice;
  const reviewVal = context.query.minReviewCount;
  const mainCat = context.query.category;
  const subCat = context.query.sub_category;
  //const currentLanguage = context.params.slug; // Language-based context

  // Ensure categories is always an array
  //const categoriesParam = Array.isArray(mainCat) ? mainCat : [mainCat];

  try {
    // Fetch products
    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        page,
        per_page: 30, // Set the number of products per page (30 is more common)
        min_price: minPrice,
        reviews_count: reviewVal,
        category: subCat || mainCat, // Correct usage of categories array
      },
    });

    // Fetch total product count
    const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`);

    // Return props
    return {
      props: {
        products: res.data,
        currentPage: Number(page),
        totalCount: resCount.data.total_count,
        test: subCat || mainCat,
      },
    };
  } catch (error) {
    // Log error and return fallback values
    console.error("Error fetching products:", error.message);
    return {
      props: {
        products: [],
        currentPage: 1,
        totalCount: 0,
      },
    };
  }
}

