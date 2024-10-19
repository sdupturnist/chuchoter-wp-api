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


export default function AllProducts({ products, currentPage, totalCount, test }) {
  const router = useRouter();
  const { query } = router;

  const allProducts = products?.data ?? [];
  const totalProducts = totalCount?.data?.length;
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
      paginationUrl(query.main_categories, query.sub_categories, page, language)
    );
  };

  console.log(products)

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
          <ProductListing
            data={allProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            productsPerPage={productsPerPage}
            totalCount={totalCount?.data?.length}
          />
        </div>
      </Layout>
    </>
  );
}







export async function getServerSideProps(context) {
  
  const { page = 1 } = context.query; 

  const { categories } = context.query; // Get categories from query parameters

  const minPrice = context.query.minPrice || 0;
  const reviewVal = context.query.minReviewCount || 0;

  const url = `${wordpressRestApiUrlWoocommerceCustom}products?categories[]=${categories || ''}&search&reviews_count=${reviewVal}&min_price=${minPrice}&page=${page}&per_page=30`;

  try {
    const response = await axios.get(url);
    return {
      props: {
        products: response.data,
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



// export async function getServerSideProps(context) {
//   const { page = 1 } = context.query; 
//   const { minPrice, minReviewCount, categories: mainCat, sub_categories: subCat } = context.query;

//   try {
//     const res = await axios.get(`${frontendUrl}/api/products`, {
//       params: {
//         page,
//         min_price: minPrice,
//         reviews_count: minReviewCount,
//         'categories[]': mainCat, // Correcting the dynamic key
//         sub_categories: subCat,
//       },
//     });

//     const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`, {
//       params: {
//         per_page: 5000,
//         categories: mainCat,
//         sub_categories: subCat,
//       },
//     });

//     return {
//       props: {
//         products: res.data,
//         currentPage: Number(page),
//         totalCount: resCount.data,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//     // You can also log the error response if needed: console.error(error.response?.data);
//     return { props: { products: [], currentPage: 1, totalCount: 0 } };
//   }
// }