import { adminUrl, frontendUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useModalContext } from "@/context/modalContext";
import { useRouter } from "next/router";
import Review from "@/components/Review";
import ImageGallery from "react-image-gallery";
import { useProductContext } from "@/context/productContext";
import { useCartContext } from "@/context/cartContext";
import Metatags from "@/components/SeoProducts";
import Images from '@/components/Images';
import { AOSInit } from '@/components/Aos';
import axios from 'axios';


export default function ProductSingle({ product, reviews }) {
  const router = useRouter();
  const { query } = router;

  //console.log(reviews)

  const { setModalFor, setShowModal } = useModalContext();
  const { setProductId, setProductName } = useProductContext();
  const { cartItems, setCartItems } = useCartContext();


  const [filteredReviews, setFilteredReviews] = useState([]);




  useEffect(() => {
    // Filter reviews by product_id "234"
    const filtered = reviews.filter(review => review.acf.product_id === `${String(product?.id)}`);
    setFilteredReviews(filtered);
  }, [reviews]);




  // Update product context
  useEffect(() => {
    setProductId(product?.id ?? null);
    setProductName(product?.name ?? null);
    // setProductReviewCount(reviewData_?.data?.review?.data?.length ?? 0);
  }, []);





  const images = product?.images.map((item) => ({
    original: item?.src,
    thumbnail: item?.src,
    originalAlt: item?.alt,
    thumbnailAlt: item?.alt,
    originalTitle: item?.alt,
    thumbnailTitle: item?.alt,
  })) || [];

  const openAddReviewModal = () => {
    setShowModal(true);
    setModalFor('add-review');
  };



  const addToCartAndOrder = (id, regular_price, offerprice, name) => {
    if (!id || isNaN(id)) {
      alert('Please enter a valid item ID.');
      return;
    }

    const newItem = {
      id: String(id),
      quantity: 1,
      price: offerprice ?? regular_price,
      name: name,
    };

    // Initialize cartItems from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

    let updatedItems;
    if (existingItemIndex !== -1) {
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems = [...cartItems, newItem];
    }

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    router.push('/cart');
  };


  // const publicReviews = product?.reviews?.filter(review => review.showPublic);

  // const reviewCount = publicReviews?.length

  return (
    <>
      {/* 
        <Metatags seo={product&& product?.data?.shops?.data[0]?.attributes} />

           */}
      <Layout page="product-single">
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid sm:gap-[10px] gap-[10px] sm:mb-[50px] mb-[30px] mt-[10px] ">

            <Breadcrumbs
              pages={[
                {
                  "name": `${query.category}`,
                  "link": `/${query.category}`,
                },

                {
                  "name": `${product?.acf?.sub_categories[0]?.post_name.toString().replace(/-/g, ' ').toLowerCase()}`,
                  "link": `/${product?.acf?.sub_categories[0]?.post_name.toString().toLowerCase()}`,
                },

                {
                  "name": `${product?.name ?? null}`,
                  "link": "",
                },
              ]}
            />


            <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[50px] gap-[30px]">
              <div data-aos="fade-up">
                {!product && <div className="skeleton mx-auto w-full block rounded-[8px] object-cover sm:min-h-[700px]"></div>}

                {images.length !== 0 && <ImageGallery
                  items={images}
                  showNav={false}
                  lazyLoad={true}
                />}

                {images.length == 0 &&

                  <Images
                    width={500}
                    height={500}
                    quality={100}
                    placeholder={false}
                    imageurl={frontendUrl + 'images/plcaeholder-ni-image.webp'}
                    classes={'w-full object-cover rounded-[10px] aspect-square'}
                    alt={'Sorry no image available'}
                    title={'Sorry no image available'}
                  />


                }

              </div>
              <div data-aos="fade-up" data-aos-delay="500" className="items-center lg:px-[20px]">
                <div>
                  {!product && <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>}
                  <span className='block text-[16px] text-black text-opacity-50 mb-[10px] capitalize'>{product?.acf?.sub_categories[0]?.post_name ?? null}</span>
                  <h1 className="sm:text-[40px] text-[6.5vw] font-semibold">{product?.name ?? null}</h1>
                {filteredReviews.length > 0 ? <span className='flex gap-[10px] text-[16px] text-black text-opacity-50 items-center mt-[14px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" className='mb-[1px]' height="16" fill="none" viewBox="0 0 13 13">
                      <path fill="#E7B66B" d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z" />
                    </svg>
                    {filteredReviews.length} Reviews
                  </span>
                    :
                    null
                  }
                  <span className='flex gap-[14px] mt-[32px]'>
                    {product?.sale_price && <del className='text-[24px] font-normal opacity-60'>
                      {product?.regular_price ?? null} QR
                    </del>
                    }
                    <span className='text-[24px] font-bold'>
                      {product?.sale_price ?? null}
                      {!product?.sale_price && <span>{product?.regular_price ?? null}</span>} QR {product?.attributes[0]?.options[0] && <span className='text-[11px] font-light uppercase '>/ {product?.attributes[0]?.options[0]}</span>}
                    </span>
                  </span>

                  {product?.short_description &&
                    <>
                      <div className="text-gray-500 sm:mt-[30px] mt-[34px]" dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                    </>
                  }
                  <div className="sm:flex grid items-center gap-[10px] w-full mt-[40px]">
                    <Cart
                      itemid={product?.id ?? null}
                      size="sm:max-w-[170px] w-full min-w-[171px]"
                      price={product?.sale_price !== null ? product?.sale_price : product?.regular_price}
                      name={product?.name}
                    />

                    <button onClick={(e) => addToCartAndOrder(
                      product?.id ?? null,
                      product?.regular_price ?? null,
                      product?.sale_price ?? null,
                      product?.name ?? null)}
                      className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white">Add to cart</button>
                  </div>
                  {product?.id && <span className="block text-[12px] uppercase text-gray-400 sm:my-[40px] mb-[30px] mt-[40px]">Product code:
                    <span className="text-black pl-2">
                      #{product?.id}
                    </span>
                  </span>}

                  {
                    !filteredReviews.length &&
                    <button
                      className="btn border border-black text-black border-solid bg-white sm:mt-[32px] mt-[24px] hover:bg-gray-900  rounded-[6px] sm:w-[170px] w-[100%] min-h-[60px] hover:text-white"
                      onClick={openAddReviewModal}
                    >
                      Write a review
                    </button>
                  }

                </div>
              </div>
            </div>

            <div className="mt-[32px]" data-aos="fade-up">
              <div role="tablist" className="tabs tabs-lifted md:mt-[40px]">

                {product?.acf?.includes &&
                  (
                    <>
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        defaultChecked={product?.acf?.includes}
                        className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                        aria-label="Includes"
                      />

                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]"
                      >
                        <div
                          className="[&>*]:text-gray-500 [&>*]:mb-4 [&>*]:block ht-content"
                        >
                          <div dangerouslySetInnerHTML={{ __html: product?.acf?.includes && product?.acf?.includes }} />
                        </div>
                      </div>
                    </>
                  )
                }


                {product.description &&
                  (
                    <>
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        defaultChecked={!product.description}
                        className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                        aria-label="Description"
                      />

                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]"
                      >
                        <div
                          className="[&>*]:text-gray-500 [&>*]:mb-4 [&>*]:block ht-content"
                        >
                          <div dangerouslySetInnerHTML={{ __html: product?.description && product?.description }} />
                        </div>
                      </div>
                    </>
                  )
                }


                {filteredReviews.length > 0 &&
                  <>
                    <input type="radio"
                      defaultChecked={!product.Includes || !product.Description}
                      name="my_tabs_2" role="tab"
                      className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                      aria-label={`${filteredReviews.length} Reviews`} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]">
                      <ul className="grid review-list">
                        {reviews && filteredReviews.map((item, key) => {
                          return (
                            <Review
                              key={key}
                              data={item}
                            />
                          )
                        })}
                      </ul>
                    </div>
                  </>
                }
              </div>

              {product.content ||
                product?.acf?.includes
                ||
                filteredReviews.length > 0
                ? <button
                  className="btn border border-black border-solid bg-black sm:mt-[32px] mt-[24px] hover:bg-gray-900  rounded-[6px] sm:w-[170px] w-[100%] min-h-[60px] hover:text-white"
                  onClick={openAddReviewModal}
                >
                  Write a review
                </button> :
                null
              }

            </div>

          </div>
        </div>
      </Layout>

    </>
  );
}




export async function getServerSideProps(context) {
  const { slug } = context.params; // Get the slug from URL parameters

  try {
    // Fetch product data based on the slug
    const res = await axios.get(`${frontendUrl}/api/productSingle`, {
      params: { slug },
    });


    const reviewsData = await axios.get(`${frontendUrl}/api/reviews`);

    return {
      props: {
        product: res.data[0], // Set the fetched products
        reviews: reviewsData.data,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return {
      props: {
        product: [],
        reviews: []
      },
    };
  }
}



