import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Card from '@/components/Cards';
import Pagination from '@/components/Pagination';
import NoData from '@/components/Nodata';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@/context/themeContext';
import Metatags from '@/components/Seo';
import { useRouter } from 'next/router';

export default function ProductListing({products, totalCount, currentPage, title, mainCat}){

    
  const router = useRouter();
  const { query } = router;
   

    const allProducts = products?.data ?? [];
    const totalProducts = totalCount; // Replace this with actual total products count from your API if available
    const productsPerPage = 30; // This should match the per_page value used in the API call
    const totalPages = Math.ceil(totalProducts / productsPerPage);
  //query.category


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
    router.push(`/${query.category}?page=${page}`);
  };



    return(<>
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
            title={title}
            mainCat={mainCat}
            data={allProducts}
          />

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
    </>)
}