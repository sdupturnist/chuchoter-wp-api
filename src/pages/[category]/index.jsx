import { useRouter } from 'next/router';
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Card from '@/components/Cards';
import Pagination from '@/components/Pagination';
import NoData from '@/components/Nodata';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@/context/themeContext';
import Metatags from '@/components/Seo';

export default function AllProducts({ 
  productData_, 
 // pageData_, 
//  pageDataMainCatSeo_
}) {
 const allProducts = productData_?.data?.products?.nodes ?? [];
  const pagination = productData_?.data?.products?.found ?? {};
  const { themeLayout } = useThemeContext();
  const router = useRouter();
  const { query } = router;
  const [currentUrl, setCurrentUrl] = useState('');



  //console.log(productData_?.data?.products?.found)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);

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
                {/* title={query.category.replace(/-/g, ' ')} */}
                {/* data={productData_} */}
              {/* /> */}
    
              {productData_?.data?.products?.found > 0 ? (
                <>
                  <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
                    {allProducts.map((item, key) => {
                      const publicReviews = item?.attributes?.reviews?.filter(review => review.showPublic);
    
                      return (
                        <div className="w-full" key={key}>
                          <Card
                            type="cat"
                            item={item}
                            review={publicReviews ? publicReviews.length : null}
                            theme={themeLayout}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center pb-[100px] lg:pb-[0]">
                    {console.log(currentUrl)}
                    {/* <Pagination
                      currentPage={1}
                      pageCount={pagination}
                      pageLink={currentUrl}
                    /> */}


<Pagination
        currentPage={1}
        pageCount={pagination}
        pageLink={currentUrl}
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
  const { params, query } = context;
  // const categorySlug = params.category?.replace(/-/g, '_')?.toLowerCase();
  // const categorySlugFallback = params.category?.replace(/-/g, '-')?.toLowerCase();
  const page = parseInt(query.page) || 1; // Default to page 1 for static props
  const pageSize = 30; // Set your desired page size
  // const minPrice = parseInt(query.minPrice) || 0
  // const maxPrice = parseInt(query.maxPrice) || 0;
  // const minReviewRating = parseInt(query.minReviewCount) || 0 

  try {
    // Fetch data for the provided subcategory
    const productDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({



        // query ($page: Int, $pageSize: Int, $categorySlug: String,  $maxPrice: Float, ${minReviewRating > 0 ? '$minReviewRating: Int' : ''}) {
        //   shops(
        //     pagination: { page: $page, pageSize: $pageSize }
        //     filters: {
        //       sub_categories: { slug: { eq: $categorySlug } }
        //       normalPrice: { gt: $maxPrice }
        //       ${minReviewRating > 0 ? 'reviews: { rating: { eq: $minReviewRating } }' : ''}
        //     }
        //   ) {


        query: `
         query ShopProducts  {
 products(first: ${pageSize}) {
    found
 nodes {
      id
      
      featured
      name
      description
      reviewCount
      onSale
      type
      
      image {
        altText
        sourceUrl
      }
      ... on ProductWithPricing {
        regularPrice
      }
      ... on VariableProduct {
        regularPrice
      }
      ... on SimpleProduct {
        regularPrice
      }
      ... on ExternalProduct {
        regularPrice
      }
      ... on GroupProduct {
        regularPrice
      }
      ... on WithAcfShopProductsListAcf {
        shopProductsListAcf {
          featured
          includes
          mainCategories {
            edges {
              node {
                id
                slug
              }
            }
          }
          subCategories {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      }
      ... on NodeWithTitle {
        seo {
          canonical
          focuskw
          opengraphSiteName
          metaDesc
          metaKeywords
          title
          opengraphDescription
          opengraphUrl
          opengraphImage {
            altText
            link
            sourceUrl
          }
          opengraphType
          opengraphTitle
          opengraphModifiedTime
          twitterDescription
          twitterTitle
          twitterImage {
            sourceUrl
          }
        }
      }
    }
  }
}

        `,
        //variables: { page, pageSize, categorySlug: categorySlugFallback, minPrice, maxPrice, minReviewRating },
      }),
    });
    const productData_ = await productDataResponse.json();

    // Check if the desired subcategory has any results
//     const hasDesiredCategory = productData_.data.shops.data.length > 0;

//     let finalProductData = productData_;

//     if (!hasDesiredCategory) {
//       // Fetch fallback data based on main category
//       const fallbackProductDataResponse = await fetch(wordpressGraphQlApiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           query: `
//             query ShopProducts {
//  products(first: 5) {
//     found
//  nodes {
//       id
      
//       featured
//       name
//       description
//       reviewCount
//       onSale
//       type
      
//       image {
//         altText
//         sourceUrl
//       }
//       ... on ProductWithPricing {
//         regularPrice
//       }
//       ... on VariableProduct {
//         regularPrice
//       }
//       ... on SimpleProduct {
//         regularPrice
//       }
//       ... on ExternalProduct {
//         regularPrice
//       }
//       ... on GroupProduct {
//         regularPrice
//       }
//       ... on WithAcfShopProductsListAcf {
//         shopProductsListAcf {
//           featured
//           includes
//           mainCategories {
//             edges {
//               node {
//                 id
//                 slug
//               }
//             }
//           }
//           subCategories {
//             edges {
//               node {
//                 id
//                 slug
//               }
//             }
//           }
//         }
//       }
//       ... on NodeWithTitle {
//         seo {
//           canonical
//           focuskw
//           opengraphSiteName
//           metaDesc
//           metaKeywords
//           title
//           opengraphDescription
//           opengraphUrl
//           opengraphImage {
//             altText
//             link
//             sourceUrl
//           }
//           opengraphType
//           opengraphTitle
//           opengraphModifiedTime
//           twitterDescription
//           twitterTitle
//           twitterImage {
//             sourceUrl
//           }
//         }
//       }
//     }
//   }
// }

//           `,
//          // variables: { page, pageSize, categorySlug: categorySlug, minPrice, maxPrice, minReviewRating },
//         }),
//       });
//       finalProductData = await fallbackProductDataResponse.json();
//     }

    // Fetch additional page data
    // const pageData = await fetch(wordpressGraphQlApiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     query: `
    //       query ($categorySlug: String) {
    //         subCategorie(
    //           pagination: { limit: 1000 }
    //           filters: { slug: { contains: $categorySlug } }
    //         ) {
    //           data {
    //             attributes {
    //               seo {
    //                 metaTitle
    //                 metaDescription
    //                 metaImage {
    //                   data {
    //                     attributes {
    //                       alternativeText
    //                       url
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     `,
    //     variables: { categorySlug: categorySlugFallback },
    //   }),
    // });
    // const pageData_ = await pageData.json();

    // Fetch SEO data for the main category
    // const mainCategorySeoResponse = await fetch(wordpressGraphQlApiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     query: `
    //       query ($categorySlug: String) {
    //         mainCategories(
    //           pagination: { limit: 1000 }
    //           filters: { slug: { contains: $categorySlug } }
    //         ) {
    //           data {
    //             attributes {
    //               seo {
    //                 metaTitle
    //                 metaDescription
    //                 metaImage {
    //                   data {
    //                     attributes {
    //                       alternativeText
    //                       url
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     `,
    //     variables: { categorySlug: categorySlugFallback },
    //   }),
    // });
    // const pageDataMainCatSeo_ = await mainCategorySeoResponse.json();


 
    return {
      props: {
        productData_,
        // pageData_,
        // pageDataMainCatSeo_,
     
        
      },
    };
  } 
  
  catch (error) {
    console.error("Error fetching data:", error);
    return {
     // notFound: true, // Return 404 if there's an error
    };
  }
  
}
