import { useRouter } from 'next/router';
import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Card from '@/components/Cards';
import Pagination from '@/components/Pagination';
import NoData from '@/components/Nodata';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@/context/themeContext';
import Metatags from '@/components/Seo';
import axios from 'axios';
import { useLanguageContext } from '@/context/LanguageContext';



export default function AllProducts({ products, currentPage, totalCount , test}) {

  const router = useRouter();
  const { query } = router;


  const allProducts = products?.data ?? [];
  const totalProducts = totalCount; // Replace this with actual total products count from your API if available
  const productsPerPage = 30; // This should match the per_page value used in the API call
  const totalPages = Math.ceil(totalProducts / productsPerPage);


  const { language } = useLanguageContext();


console.log(test)

  const toCapitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  // const filteredProducts = products
  // .filter(product =>
  //   product.acf.main_categories.some(category => category.post_title === toCapitalize(query.category))
  // );



  //console.log(filteredProducts)





  const { themeLayout } = useThemeContext();
  const [currentUrl, setCurrentUrl] = useState('');

  //console.log(allProducts)

  //console.log(productData_?.data?.products?.found)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);


  const handlePageChange = (page) => {
    router.push(`/${query.main_categories.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}?page=${page}&main_categories=${query.main_categories}`);
  };


  //http://localhost:3000/chocolates/en/?page=2&category=chocolates-en


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
            title={query.main_categories}
            mainCat={query.main_categories}
            data={allProducts}
          />
{/*  */}
          {allProducts.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
                {products && allProducts.map((item, key) => {
                  return (
                    <div className="w-full" key={key}>
                      <Card
                        type="cat"
                        item={item}
                        theme={themeLayout}
                      />
                    </div>
                  );
                })}
              </div>

              {allProducts.length > productsPerPage - 3 ?
                <div className="text-center pb-[100px] lg:pb-[0]">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
                : null
              }

            </>
          ) : (
            <NoData title={`Sorry, no any ${query.category} available.`} />
          )}
        </div>
      </Layout>

    </>

  );
}


export async function getServerSideProps(context) {


  const { page = 1 } = context.query; // Get the page number from query parameters

  const minPrice = context.query.minPrice 
  const reviewVal = context.query.minReviewCount
  const cat1 = context.query.main_categories
  const cat2 = context.query.sub_categories
  const currentLanguage = context.params.slug


  try {
    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        page,
        per_page: 30,
        min_price: minPrice,
        reviews_count: reviewVal,
        main_categories: cat1,
        sub_categories: cat2,
        language: currentLanguage
      },
    });


    // https://demo.chuchoterqatar.com/wp-json/wc-custom/v1/products?reviews_count=0&min_price=0&page=1&per_page=1&sub_categories=flavours&main_categories=chocolates



    // Fetch total product count
    const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`);




    return {
      props: {
        products: res.data,
        currentPage: Number(page),
        totalCount: resCount.data.totalCount,
        test: context.query.main_categories

      }
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { props: { products: [], currentPage: 1, totalCount: 0 } }; // Set default total count to 0 on error
  }
}



