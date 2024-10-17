



import Layout from '@/components/Layout'
import Link from 'next/link'
import { frontendUrl, transalateText } from '@/utils/variables'
import { useCartContext } from '@/context/cartContext'
import { useEffect } from 'react'
import { useSiteContext } from "@/context/siteContext";
import { useLanguageContext } from "@/context/LanguageContext";

export default function OrderSuccess() {


    const {cartItems, setCartItems} = useCartContext()
    const { siteTransalations } = useSiteContext();
    const { language } = useLanguageContext();


useEffect(() => {
    setCartItems(null)
  
}, [cartItems]);


  


    return (
        <>
            <Layout
                page="404"
            >
           
                <div className="container [&>*]:text-black">
                    <div className="mx-auto 2xl:w-[70%] xl:w-[80%] h-[80vh] sm:w-[80%] w-[90%] flex justify-center items-center text-center">
                        <div className='grid sm:gap-[40px] gap-[16px]'>
                      <h1 className='lg:text-[4vw] sm:text-[50px] text-[22px] leading-[34px] sm:font-normal font-semibold'>{transalateText(siteTransalations?.generalTranslations?.order_success_heading,language)}</h1>
                            <p className="md:text-[1.6rem] text-[1rem] mb-[20px] text-gray-500">{transalateText(siteTransalations?.generalTranslations?.order_success_desc,language)}</p>
                            <Link title="Back to home" aria-label="Back to home" href={frontendUrl} className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white mx-auto">{transalateText(siteTransalations?.generalTranslations?.home,language)}</Link>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}