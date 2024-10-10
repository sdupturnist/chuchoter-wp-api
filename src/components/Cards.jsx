import Images from '@/components/Images';
import { useThemeContext } from '@/context/themeContext';
import Link from 'next/link';
import Cart from './Cart';
import { useEffect, useState } from 'react';
import { adminUrl, frontendUrl } from '@/utils/variables';
import { truncateWords } from '@/utils/TruncateWords';
import { AOSInit } from './Aos';


export default function Card({ theme, desc, type, item }) {


const review = item?.acf?.user_reviews


    const { themeLayout } = useThemeContext();

    const [isLoading, setIsLoading] = useState(true);





    useEffect(() => {
        if (item) {
            setIsLoading(false);
        }
    }, [item]);


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






    let cardType;
    switch (type) {

        //CATEOFARY PAGE CARDS
        case "cat":

            cardType = <>
                {isLoading ? (
                    <div className='grid gap-[12px]'>
                        <div className="skeleton h-32 w-full sm:min-h-[100px] rounded-[10px]"></div>
                        <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                        <div className="skeleton h-4 w-full rounded-[10px]"></div>
                        <div className="skeleton h-4 w-full rounded-[10px]"></div>
                    </div>
                ) : (
                    <>
                        <AOSInit />
                        {console.log(review?.length || null)}
                       <div data-aos="fade-up" className='grid gap-[10px] w-full card-cat sm:mb-[10px] mb-2' data-id={item?.id ?? null} data-review={review?.length}>
                          <div className='relative overflow-hidden'>
                           
                               
                                <Link className='block' href={`/${item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_name.toString().toLowerCase()}/${item?.name?.toLowerCase().replace(/ /g, '-')}`}>
                                    <Images
                                        width="170"
                                        height="170"
                                        quality={100}
                                        placeholder={true}
                                        imageurl={item?.images[0]?.src && item?.images[0]?.src}
                                        classes={'w-full object-cover rounded-[10px] aspect-square 2xl:min-w-[170px]'}
                                        alt={item?.images[0]?.alt ?? 'Product'}
                                        title={item?.images[0]?.alt ?? 'Product'}
                                    />
                                </Link>
                                <Cart
                                    itemid={item?.id ?? null}
                                    type="button"
                                    price={item?.sale_price || item?.price || item?.regular_price}
                                    name={item?.name}
                                />

                            </div>
                            <div className='grid gap-[7px] mt-[2px]'>

   <Link className='block' href={`/${item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_name.toString().toLowerCase()}/${item?.name?.toLowerCase().replace(/ /g, '-')}`}>
                                    <h4 className='text-[14px] text-black'>{item?.name ?? null}</h4>
                                </Link>
                                {item?.acf?.sub_categories && [0]?.sub_categories?.data[0]?.attributes?.slug}
                                {!desc == true ?
                                    <span className='block text-[12px] text-black text-opacity-80 capitalize'>{item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_title?.replace(/-/g, ' ')}</span>
                                    :
                                    null
                                }
                                {type == true ?
                                    <p className='text-[12px] leading-[20px] text-black text-opacity-80'> {truncateWords(item?.short_description ?? null ?? null, 20)}</p>
                                    :
                                    null
                                }
                            </div>

                             {review?.length > 0  ?
                                <>
                                    <span className='flex gap-[6px] text-[12px] text-black text-opacity-80 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" className='mb-[3px]' height="12" fill="none" viewBox="0 0 13 13">
                                            <path fill={color} d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z" />
                                        </svg>
                                        {review?.length} Reviews</span>
                                </>
                                : null
                            }

                            <span className='flex gap-[8px]'>
                                {item?.sale_price && <del className='text-[14px] font-light'>
                                    {item?.regular_price}  QR
                                </del>
                                }
                                <span className='text-[14px] font-semibold'>
                                    {item?.sale_price || item?.price}
                                    {!item?.sale_price || !item?.price && <span>{item?.regular_price ?? null}</span>} QR {item?.attributes[0]?.options[0] && <span className='text-[11px] font-light uppercase '>/ {item?.attributes[0]?.options[0]}</span>}
                                </span>
                            </span>
                            <div className='xl:hidden mt-[4px]'>
                                <Cart
                                    itemid={item?.id ?? null}
                                    type="button-small"
                                    price={item?.sale_price || item?.price || item?.regular_price}
                                    name={item?.name}
                                />
                            </div>
                        </div>
                    </>
                )}
            </>
            break;



        case "blog":

            // console.log(item.attributes.Banner.data.attributes.url)
            cardType = <>
                {isLoading ? (
                    <>
                        <div className="skeleton h-32 w-full sm:min-h-[380px]"></div>
                        <div className="skeleton h-4 w-[80%]"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-[30%]"></div>
                    </>
                ) : (
                    <>
                        <AOSInit />
                        <Link data-aos="fade-up" href={`${frontendUrl}/blogs/${item && item.attributes.Slug}`} className="grid gap-[20px]">

                            <Images
                                width={item?.attributes?.Banner?.data?.attributes?.width || 0}  // Provide a default value
                                height={item?.attributes?.Banner?.data?.attributes?.height || 0} // Ensure height is also set
                                quality={100}
                                placeholder={true}
                                imageurl={item?.attributes?.Banner?.data?.attributes?.url ? adminUrl + item.attributes.Banner.data.attributes.url : ''} // Provide a fallback URL
                                classes={'mx-auto w-full block rounded-[8px] object-cover sm:min-h-[380px]'}
                                alt={item?.attributes?.Banner?.data?.attributes?.alternativeText || 'Default alt text'} // Provide a default alt text
                                title={item?.attributes?.Banner?.data?.attributes?.alternativeText || 'Default title text'} // Provide a default title text
                            />

                            <div className="grid gap-[15px]">
                                <h2 className="font-semibold text-[20px]">{item && item.attributes.Title}</h2>
                                <p className="text-gray-500 hidden sm:block">
                                    {truncateWords(item?.attributes?.Content[0]?.children[0]?.text ?? null, 30)}
                                </p>
                            </div>
                        </Link>
                    </>
                )}
            </>
            break;


        default:

            cardType = <>
                {isLoading ? (
                    <div className='grid gap-[12px]'>
                        <div className="skeleton h-32 w-full sm:min-h-[100px]  rounded-[10px]"></div>
                        <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                        <div className="skeleton h-4 w-full rounded-[10px]"></div>
                        <div className="skeleton h-4 w-full rounded-[10px]"></div>
                    </div>
                ) : (
                    <>
                        <AOSInit />
                        <div data-aos="fade-up" className='grid gap-[10px] w-full card-cat sm:mb-[10px] max-w-[190px]' data-id={item?.id ?? null}  data-review={review?.length}>
                            <div className='relative overflow-hidden'>
                                <Link className='block' href={`/${item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_name.toString().toLowerCase()}/${item?.name?.toLowerCase().replace(/ /g, '-')}`}>
                                    <Images
                                        width="170"
                                        height="170"
                                        quality={100}
                                        placeholder={true}
                                        imageurl={item?.images[0]?.src && item?.images[0]?.src}
                                        classes={'w-full object-cover rounded-[10px] aspect-square 2xl:min-w-[170px]'}
                                        alt={item?.images[0]?.alt ?? 'Product'}
                                        title={item?.images[0]?.alt ?? 'Product'}
                                    />
                                </Link>
                                <Cart
                                    itemid={item?.id ?? null}
                                    type="button"
                                    price={item?.sale_price || item?.price || item?.regular_price}
                                    name={item?.name}
                                />

                            </div>

                            <div className='grid gap-[7px] mt-[2px]'>

                                <Link className='block' href={`/${item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_name.toString().toLowerCase()}/${item?.name?.toLowerCase().replace(/ /g, '-')}`}>
                                    <h4 className='text-[14px] text-black'>{item?.name ?? null}</h4>
                                </Link>
                                {item?.acf?.sub_categories && [0]?.sub_categories?.data[0]?.attributes?.slug}
                                {!desc == true ?
                                    <span className='block text-[12px] text-black text-opacity-80 capitalize'>{item?.acf?.main_categories && item?.acf?.main_categories[0]?.post_title?.replace(/-/g, ' ')}</span>
                                    :
                                    null
                                }
                                {type == true ?
                                    <p className='text-[12px] leading-[20px] text-black text-opacity-80'> {truncateWords(item?.short_description ?? null ?? null, 20)}</p>
                                    :
                                    null
                                }
                            </div>
                            {review[0]?.acf?.product_id == item?.id  ?
                                <>
                                    <span className='flex gap-[6px] text-[12px] text-black text-opacity-80 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" className='mb-[3px]' height="12" fill="none" viewBox="0 0 13 13">
                                            <path fill={color} d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z" />
                                        </svg>
                                        {review?.length} Reviews</span>
                                </>
                                : null
                            }

                            <span className='flex gap-[8px]'>
                                {item?.sale_price && <del className='text-[14px] font-light'>
                                    {item?.regular_price}  QR
                                </del>
                                }
                                <span className='text-[14px] font-semibold'>
                                    {item?.sale_price || item?.price}
                                    {!item?.sale_price || !item?.price && <span>{item?.regular_price ?? null}</span>} QR {item?.attributes[0]?.options[0] && <span className='text-[11px] font-light uppercase '>/ {item?.attributes[0]?.options[0]}</span>}
                                </span>
                            </span>
                            <div className='xl:hidden mt-[4px]'>
                                <Cart
                                    itemid={item?.id ?? null}
                                    type="button-small"
                                    price={item?.sale_price || item?.price || item?.regular_price}
                                    name={item?.name}
                                />
                            </div>
                        </div>

                    </>
                )}
            </>
            break;



    }


    return (<>
        <>
            {cardType}

        </>
    </>)
}