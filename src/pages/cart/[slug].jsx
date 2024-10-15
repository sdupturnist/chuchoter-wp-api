import { frontendUrl, deliveryFee, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import Breadcrumbs from "@/components/Breadcrumbs";
import { useCartContext } from "@/context/cartContext";
import { useEffect, useState } from "react";
import OrderForm from "@/components/Forms/OrderForm";
import CartItem from "@/components/CartItem";
import NoData from "@/components/Nodata";
import { AOSInit } from "@/components/Aos";
import { useThemeContext } from "@/context/themeContext";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import { generalTranslations } from "@/utils/transalations";



export default function Cart({ pageData, allProducts_ }) {



  const { themeLayout } = useThemeContext();
  const { cartItems } = useCartContext();
  const { language } = useLanguageContext();



  const filteredProducts = allProducts_?.data?.filter(product =>
    cartItems && cartItems.some(item => item.id === product.id)
  );

  useEffect(() => {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      setCartData(JSON.parse(storedData));
    }
  }, []);



  // Calculate the total amount
  const totalAmount = cartItems?.reduce((total, item) => {
    return total + (item?.quantity * item?.price);
  }, 0);

  // State for order
  const [currentOrder, setCurrentOrder] = useState([]);

  // Update order when totalAmount changes
  useEffect(() => {
    const updatedOrder = [...filteredProducts, { totalAmount }];
    setCurrentOrder(updatedOrder);
  }, [totalAmount]);



  // Determine button color based on theme
  let color;
  switch (themeLayout.toLowerCase()) {
    case "white":
      color = "white";
      break;
    case 'chocolates':
      color = "#c89a3f";
      break;
    case 'flowers':
      color = "#E62263";
      break;
    case 'cakes':
      color = "#E79F02";
      break;
    case 'events':
      color = "#258F89";
      break;
    default:
      color = "#c89a3f";
      break;
  }


  return (
    <>
      <Metatags seo={pageData && pageData[0]?.yoast_head_json} />
      <Layout page="cart">
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid">
            <div className="flex justify-between items-center border-b border-black">
              <h1 className="uppercase text-[20px] font-semibold tracking-[1%] sm:my-[20px] my-[10px]">
                {pageData && pageData[0]?.title?.rendered}
              </h1>
              <Breadcrumbs
                pages={[
                  {
                    "name": pageData && pageData[0]?.title?.rendered,
                    "link": "",
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-[10px] lg:gap-[50px] lg:mb-0 mb-[30px]">
              <div className={`${cartItems && cartItems.length !== 0 ? 'lg:col-span-3' : 'lg:col-span-12'} sm:py-[50px]`}>
                {cartItems && cartItems.length !== 0 ? (
                  <div className="cart-item-wrpr grid sm:gap-[16px] border-b lg:border-none border-black border-solid sm:pb-[20px] lg:pb-[0]">
                    {filteredProducts.map((product, key) => {
                      // Find the corresponding added item to get quantity
                      const addedItem = cartItems.find(item => item.id === product.id);
                      const quantity = addedItem ? addedItem.quantity : 0;
                      return (
                        <CartItem
                          key={key}
                          item={product}
                          price={product?.price !== null ? product?.sale_price : product?.regular_price}
                          color={color}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <NoData title={`Your cart is empty`} />
                )}
         

                {totalAmount > 0 && cartItems && cartItems.length !== 0 ?
                  <div className="lg:border lg:rounded-[6px] rounded-none border-solid lg:border-gray-200 border-black lg:p-[20px] py-[16px] lg:mt-[20px] lg:border-t ">
                    <p className="flex justify-between w-full border-b border-solid border-gray-200 pb-[16px]">
                      <span className="block text-black text-opacity-50"> {generalTranslations.subtotal[language]}</span>
                      <span className="block text-black text-opacity-50">{totalAmount}  {generalTranslations.qr[language]}</span>

                    </p>
                    <p className="flex justify-between w-full border-b border-solid border-black py-[16px]">
                      <span className="block text-black text-opacity-50"> {generalTranslations.delivery_fee[language]}</span>
                      <span className="block text-black text-opacity-50">{deliveryFee}  {generalTranslations.qr[language]}</span>
                    </p>
                    <p className="flex justify-between w-full lg:pt-[16px] pt-[16px] pb-[4px]">
                      <span className="block font-semibold text-[16px] uppercase">
                        {generalTranslations.total[language]}
                      </span>
                      <span className="block font-semibold text-[16px] uppercase">
                        {parseFloat(totalAmount) + parseFloat(deliveryFee)}  {generalTranslations.qr[language]}
                      </span>
                    </p>
                  </div>
                  :
                  null
                }
              </div>
              {cartItems && cartItems.length !== 0 &&
                <div className={`${language === 'ar' ? 'lg:border-r' : 'lg:border-l'} lg:col-span-2  border-black border-solid lg:p-[50px]`} >
                  <OrderForm
                    totalAmountOrder={parseFloat(totalAmount) + parseFloat(deliveryFee)}
                    items={cartItems}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getServerSideProps(context) {

  const { params } = context;

  // Extract the language from the params
  const lang = params.slug; // Assuming you have a dynamic route like /about/[slug]
  const slug = `cart-${lang}`; // Constructing the slug


  try {



    const cartRes = await axios.get(`${frontendUrl}/api/cart`, {
      params: { slug },
    });



    const productsRes = await axios.get(`${frontendUrl}/api/products`, {
      params: {
        per_page: 100,
      },
    });



    return {
      props: {
        pageData: cartRes.data,
        allProducts_: productsRes.data,
      }
    };

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { props: { pageData: [], allProducts_: [], } }; // Set default total count to 0 on error
  }
}


