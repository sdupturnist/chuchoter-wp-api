import { useRouter } from "next/router";
import { frontendUrl, paginationUrl, wordpressRestApiUrlWoocommerceCustom } from "@/utils/variables";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import Metatags from "@/components/Seo";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";
import ProductListing from "@/components/ProductListing";
import { useTranslation } from "next-i18next";


export default function AllProducts({ products, currentPage, totalCount }) {
  const router = useRouter();
  const { query } = router;

  const { i18n } = useTranslation()

  const allProducts = products?.data ?? [];
  const totalProducts = totalCount;
  const productsPerPage = 30;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const { language } = useLanguageContext();

  const { subCategoryData } = useSiteContext();

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);

  const handlePageChange = (page) => {
    router.push(
      paginationUrl('chocolates', page)
    );
  };

//console.log(totalCount)

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
          {/* <PageHeader */}
            {/* type="cat" */}
            {/* catcount={5} */}
            {/* title={query.main_categories || ""} */}
            {/* mainCat={query.main_categories} */}
            {/* subCat={query.main_categories} */}
            {/* data={subCategoryData && subCategoryData?.products} */}
          {/* /> */}

          {}
          <ProductListing
            data={allProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            productsPerPage={productsPerPage}
            mainCat={query}
            totalCount={totalCount}
            currenPageNumber={query.page}
          />
        </div>
      </Layout>
    </>
  );
}





export async function getServerSideProps(context) {
  const { locale, query } = context;

  // Destructure query parameters
  const { page = 1, category, minPrice = 0, minReviewCount = 0 } = query;

  // Build the URL using the category and other parameters
  const productsRes = `${wordpressRestApiUrlWoocommerceCustom}products?categories[]=${category || ''}&reviews_count=${minReviewCount}&min_price=${minPrice}&page=${page}&per_page=30`;

  const resCount = `${wordpressRestApiUrlWoocommerceCustom}products?categories[]=${category || ''}&per_page=5000`

  try {
    const response = await axios.get(productsRes);
    const responseTotalProductCount = await axios.get(resCount);

    return {
      props: {
        products: response.data,
        locale, // Pass locale directly
        totalCount:responseTotalProductCount.data.total,
        currentPage: Number(page),
      },
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      props: {
        products: [],
        error: 'Failed to load products',
      },
    };
  }
}


