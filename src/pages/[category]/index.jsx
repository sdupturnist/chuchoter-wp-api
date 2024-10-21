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
}) {
  const router = useRouter();
  const { query } = router;

  const { i18n } = useTranslation();

  const allProducts = products?.products ?? [];
  const totalProducts = totalCount;
  const productsPerPage = 30
  const totalPages = Math.ceil(totalCount/productsPerPage);

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

  console.log(totalCount)

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
  // Destructure query params with defaults
  const { page = 1, minPrice, minReviewCount, category: mainCat, sub_category: subCat } = context.query;
  
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
        category: category?.replace(/-/g, " ") // Handle categories with hyphens, if necessary
      },
    });

    // Fetch total product count
    const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`, {
      params: {
        categories: category?.replace(/-/g, " ") // Ensure categories format is correct
      },
    });

    // Return props
    return {
      props: {
        products: res.data,
        currentPage: Number(page),
        totalCount: resCount.data.total_count,
      },
    };
  } catch (error) {
    // Log more error details for easier debugging
    console.error("Error fetching products:", error.response ? error.response.data : error.message);

    return {
      props: {
        products: [],
        currentPage: 1,
        totalCount: 0,
      },
    };
  }
}
