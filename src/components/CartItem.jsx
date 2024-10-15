import Cart from "@/components/Cart";
import Images from '@/components/Images';
import { useCartContext } from "@/context/cartContext";
import { adminUrl } from "@/utils/variables";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'
import { generalTranslations } from "@/utils/transalations";
import { useLanguageContext } from "@/context/LanguageContext";


export default function CartItem({ item, color }) {
    const { cartItems, setCartItems } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    const itemid = item.id;



    const { language } = useLanguageContext();


  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);







    


    const removeFromCartConfirm = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div className="sm:rounded-[6px] sm:border border-b border-solid border-gray-200 sm:p-[20px] py-[24px] sm:flex justify-between">
            <div className="flex md:items-center items-start gap-[20px] w-full">
                {/* <Link href={`/${item?.acf?.main_categories}/${item?.slug}`}> */}

                <Link className='block' href={`/${item?.acf?.main_categories && item?.acf?.main_categories.toString().toLowerCase()}/${item?.name?.toLowerCase().replace(/ /g, '-')}/${language}`}>
   <Images
                        width="170"
                        height="170"
                        quality={100}
                        placeholder={true}
                        imageurl={item?.images[0]?.src && item?.images[0]?.src}
                        classes='md:w-[60px] md:h-[60px] md:min-w-[60px] md:min-h-[60px] w-[100px] h-[130px] min-w-[130px] min-h-[130px] object-cover rounded-[4px]'
                        alt={item?.images[0]?.alt ?? 'Product'}
                        title={item?.images[0]?.alt ?? 'Product'}
                    />
                </Link>

                <div className="md:flex items-center justify-between w-full">
                    <div className="grid gap-[4px] pr-5 w-full relative">
                        <button
                         id="removeFromCart"
                         onClick={(e) => removeFromCartConfirm(item?.id)}
                        className="md:hidden absolute right-0 top-0">
                          <XMarkIcon className="text-black size-4"/>
                        </button>
                        <Link href={`/${item?.acf?.main_categories}/${item?.slug}/${language}`}>
                     <h4 className='text-[14px] text-black'>{item?.name}</h4>
                        </Link>
                        <span className='block text-[12px] text-black text-opacity-80 capitalize'>{item?.acf?.sub_categories[0]?.post_name?.replace(/_/g, ' ')}</span>
                    </div>

                    <div className="sm:flex grid items-center justify-between sm:gap-[24px] gap-[14px] mt-4 md:mt-0 w-full">
                        <Cart
                        itemid={item.id}
                        price={item?.price !== null ? item?.price : item?.regular_price}
                        />
                     {item?.price || item?.regular_price &&   <span className='flex gap-[8px]'>
                          <span className='block font-semibold text-[16px] uppercase'>
                                {item?.price !== null ? item?.price : item?.regular_price}
                            {generalTranslations.qr[language]}
                            </span>
                        </span>}

                        
                        <button
                            id="removeFromCart"
                            onClick={(e) => removeFromCartConfirm(item.id)}
                            className="hidden md:flex">
                            <XMarkIcon className="text-black size-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
