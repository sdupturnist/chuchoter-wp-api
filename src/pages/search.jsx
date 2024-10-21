import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Cards";
import NoData from "@/components/Nodata";
import Metatags from "@/components/Seo";
import { frontendUrl, transalateText } from "@/utils/variables";
import { useThemeContext } from "@/context/themeContext";
import { useSiteContext } from "@/context/siteContext";
import { useLanguageContext } from "@/context/LanguageContext";


export default function Search({ pageData, products }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const { themeLayout } = useThemeContext();
  const { siteTransalations } = useSiteContext();
  const { language } = useLanguageContext();



  useEffect(() => {
    const { query } = router.query;
    if (query) {
      const decodedQuery = decodeURIComponent(query.replace(/\+/g, ' '));
      setSearchTerm(decodedQuery);
      fetchProducts(decodedQuery);
    }
  }, [router.query]);

  const fetchProducts = async (term) => {
    setLoading(true);
    try {
      const res = await axios.get(`${frontendUrl}/api/products`, {
        params: {
          page:0,
          per_page: 30, // Set the number of products per page (30 is more common)
          min_price: 0,
          category:null,
          search: term,
        },
      });
      setSearchedProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setSearchedProducts([]);
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout page="search">
        <div className="container [&>*]:text-black grid xl:gap-[50px] gap-[5px] lg:pt-[30px] xl:pb-[70px] pb-[20px]">
          <PageHeader title={`${transalateText(
                  siteTransalations?.generalTranslations?.search,
                  language
                )} ${searchTerm}`} />

          {loading && <Loading />}

            {!loading && searchedProducts?.products?.length === 0 && (
            <NoData title={transalateText(
              siteTransalations?.generalTranslations?.no_search_results,
              language
            )}
            
            />
          )}
          
 {searchedProducts?.products?.length > 0 && (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
              {products && searchedProducts?.products?.map((item, key) => {
                const publicReviews = item?.reviews?.filter(review => review.showPublic);
                return (
                  <div className="w-full" key={key}>
                     <Card
                      type="cat"
                      item={item}
                      mainCat={item?.categories.map((item) => item.name)[0].toLowerCase()}
                      subCat={item?.categories[0]?.name || ''}
                      theme={themeLayout}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}





export async function getServerSideProps(context) {

  const searchTerm = context.query.query || '';

  try {

    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        page:0,
        per_page: 30, // Set the number of products per page (30 is more common)
        min_price: 0,
        category:null,
        search: searchTerm,
      },
    });


    const searchPageRes = await axios.get(`${frontendUrl}/api/search`);


    return {
      props: {
        products: res.data,
        pageData: searchPageRes.data,
      }
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { props: { pageData: [], products: [], } }; // Set default total count to 0 on error
  }
}


