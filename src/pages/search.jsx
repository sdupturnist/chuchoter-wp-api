import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Cards";
import NoData from "@/components/Nodata";
import Metatags from "@/components/Seo";
import { frontendUrl } from "@/utils/variables";
import { useThemeContext } from "@/context/themeContext";

export default function Search({ pageData, products }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const { themeLayout } = useThemeContext();



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
          per_page: 29,
          min_price: 0,
          reviews_count: 0,
          main_categories: '',
          sub_categories: '',
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
          <PageHeader title={`Search ${searchTerm}`} />

          {loading && <Loading />}

          {!loading && searchedProducts?.data?.length === 0 && (
            <NoData title={"Sorry, no products were found. Please try searching with different keywords."} />
          )}

          {searchedProducts?.data?.length > 0 && (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
              {products && searchedProducts?.data?.map((item, key) => {
                const publicReviews = item?.reviews?.filter(review => review.showPublic);
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
        per_page: 29,
        min_price: 0,
        reviews_count: 0,
        main_categories: '',
        sub_categories: '',
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


