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



export default function AllProducts({ products, currentPage, totalCount }) {

  const router = useRouter();
  const { query } = router;


  const allProducts = products ?? [];
  const totalProducts = totalCount; // Replace this with actual total products count from your API if available
  const productsPerPage = 30; // This should match the per_page value used in the API call
  const totalPages = Math.ceil(totalProducts / productsPerPage);





  //query.category


  const toCapitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  const filteredProducts = products
  .filter(product =>
    product.acf.main_categories.some(category => category.post_title === toCapitalize(query.category))
  );


  
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
          title={query.category.replace(/-/g, ' ')}
          data={allProducts}
          />

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
              {filteredProducts.map((item, key) => {
   


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
              <div className="text-center pb-[100px] lg:pb-[0]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />


              </div>
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


  try {
    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: { 
        page, 
        per_page: 29,
        min_price:minPrice,
        user_reviews: null, // Use user_reviews here
       }, 
    });

    // Fetch total product count
    const resCount = await axios.get(`${frontendUrl}/api/totalproductCount`);
    



    return {
      props: {
        products: res.data,
        currentPage: Number(page),
        totalCount: resCount.data.totalCount, 
      }
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { props: { products: [], currentPage: 1, totalCount: 0 } }; // Set default total count to 0 on error
  }
}




