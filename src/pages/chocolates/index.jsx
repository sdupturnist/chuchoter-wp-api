
import { frontendUrl } from "@/utils/variables";
import axios from 'axios';
import ProductListing from '@/components/ProductListing';
import { useRouter } from 'next/router';



export default function AllProducts({ products, currentPage, totalCount }) {



  const router = useRouter();
  const { query } = router;







  return (
    <>
     <ProductListing
     products={products}
     totalCount={totalCount}
     currentPage={currentPage}
     title={query.category.replace(/-/g, ' ')}
     mainCat={query.category}
  
     />

    </>

  );
}


export async function getServerSideProps(context) {


  const { page = 1 } = context.query; // Get the page number from query parameters

  const minPrice = context.query.minPrice
  const reviewVal = context.query.minReviewCount
  const cat1 = context.query.category
  const cat2 = context.query.sub_categories

  try {
    const res = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        page,
        per_page: 29,
        min_price: minPrice,
        reviews_count: reviewVal,
        main_categories: cat1,
        sub_categories: cat2
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

      }
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { props: { products: [], currentPage: 1, totalCount: 0 } }; // Set default total count to 0 on error
  }
}




