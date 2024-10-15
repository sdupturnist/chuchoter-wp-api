"use client"
import Link from 'next/link';
import Logo from './Logo';
import { motion, useViewportScroll } from 'framer-motion';
import { useModalContext } from '@/context/modalContext';
import { useState, useEffect, useRef } from 'react';
import { useThemeContext } from '@/context/themeContext';
import { useCartContext } from '@/context/cartContext';
import SearchBox from './Search';
import LanguageSwitch from './LangaugeSwitch';
import { useLanguageContext } from '@/context/LanguageContext';
import { generalTranslations } from '@/utils/transalations';
import { frontendUrl } from '@/utils/variables';
import { useRouter } from 'next/router';
import LanguageSwitchCat from './LangaugeSwitchCat';
import LangaugeSwitchSingleProduct from './LangaugeSwitchSingleProduct';
import { useSiteContext } from "@/context/siteContext";

export default function Nav({ theme, page }) {




  const { setModalFor, setShowModal } = useModalContext();
  const { themeLayout, setThemeLayout } = useThemeContext();
  const { cartItems } = useCartContext();
  const { language } = useLanguageContext();
  const { catData, navigationData, subCategoryData, contactData } = useSiteContext()



  //console.log(navigationData)

  const currentTheme = themeLayout.toString().toLowerCase()


  // TOGGLE MENU
  const [hidden, setHidden] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const { scrollY } = useViewportScroll();


  const cartCount = cartItems && cartItems.length


  const currentCartCOunt = cartCount == null ? 0 : cartCount

  const color = "#c89a3f"

  // console.log(navigationData)


  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  useEffect(() => {
    // Set initial screen width
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return scrollY.onChange(() => update());
  }, [scrollY]);

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
    hidden: {
      opacity: 0,
      y: '-100%',
      transition: {
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      },
    },
  };

  const openSearchModal = () => {
    setShowModal(true);
    setModalFor('search');
  };

  const openNavigationModal = () => {
    setShowModal(true);
    setModalFor('nav');
  };



  const Navigations = (color, language) => {
    return (
      <>

        <Link
          aria-label="Home"
          title="Home"
          href={`${frontendUrl}/${language}`}
          onClick={() => setThemeLayout('gray')}
          style={{
            color
          }}
        >
          {generalTranslations.home[language]}
        </Link>
        {FilteredCategories(headerColor, language)}

        {navigationData && navigationData
          .filter(item => item?.acf?.visible_in_menu && item?.acf?.language === language) // Filter based on visible_in_menu
          .sort((a, b) => {
            const titleA = a?.title?.rendered?.toLowerCase() || '';
            const titleB = b?.title?.rendered?.toLowerCase() || '';
            return titleA.localeCompare(titleB); // Sort titles in ascending order
          })
          .map((item, key) => {
            return (
              <li key={key}>
                <Link
                  aria-label={item?.title?.rendered}
                  title={item?.title?.rendered}
                  href={`/${item?.slug?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}`}
                  onClick={() => setThemeLayout('gray')}
                  style={{
                    color
                  }}
                >
                  {item?.title?.rendered}
                </Link>
              </li>
            );
          })}

      </>
    )
  }


  function NavigationRight(page, color) {
    return (
      <>
        <Link href={`/cart/${language}`} className={`mr-2 mr-sm-0`}
          style={{
            color
          }}
        >{generalTranslations.cart[language]} ({currentCartCOunt})</Link>

        {page === 'page-cat' ? (
          <LanguageSwitchCat color={color} label="test language toggle" />
        ) : page === 'page-single' ? (
          <LangaugeSwitchSingleProduct color label="test language toggle" />
        ) : (
          <LanguageSwitch color label="test language toggle" />
        )}



        <SearchBox
          theme={headerColor}
          page={page}
        />
        <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
            <path stroke={`#c89a3f`} strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
          </svg>
        </button>
      </>
    )
  }



  let headerColor;
  switch (currentTheme) {
    case "white":
      headerColor = "white";
      break;
    case 'chocolates':
      headerColor = "#c89a3f";
      break;
    case 'flowers':
      headerColor = "#E62263";
      break;
    case 'cakes':
      headerColor = "#E79F02";
      break;
    case 'events':
      headerColor = "#258F89";
      break;
    default:
      headerColor = "#c89a3f";
      break;
  }



  let headerColorLogo;
  switch (currentTheme) {
    case "white":
      headerColorLogo = "white";
      break;
    case 'chocolates':
      headerColorLogo = "#c89a3f";
      break;
    case 'flowers':
      headerColorLogo = "#E62263";
      break;
    case 'cakes':
      headerColorLogo = "#E79F02";
      break;
    case 'events':
      headerColorLogo = "#258F89";
      break;
    default:
      headerColorLogo = "#c89a3f";
      break;
  }




  let headerColorLogoHome;
  switch (theme?.toLowerCase()) {
    case "white":
      headerColorLogoHome = "white";
      break;
    case 'chocolates':
      headerColorLogoHome = "#c89a3f";
      break;
    case 'flowers':
      headerColorLogoHome = "#E62263";
      break;
    case 'cakes':
      headerColorLogoHome = "#E79F02";
      break;
    case 'events':
      headerColorLogoHome = "#258F89";
      break;
    default:
      headerColorLogoHome = "#c89a3f";
      break;
  }

  //console.log(catData)


  const FilteredCategories = (headerColor, language) => {


    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events'];

    const sortedCategories = catData
      ? catData
        .filter(item => item?.acf?.show_in_menu === true) // Filter by show_in_menu and language
        .sort((a, b) => customOrder.indexOf(a.title.rendered) - customOrder.indexOf(b.title.rendered)) // Optional: sort based on customOrder
      : [];


    return (
      <>
        {sortedCategories.map((item, index) => (
          <li key={index}>
            <Link
              aria-label={item?.title?.rendered}
              title={item?.title?.rendered}
              href={`/${item?.title?.rendered?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}?main_categories=${item?.title?.rendered?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}`}
              onClick={(e) => setThemeLayout(item?.title?.rendered.toLowerCase())}
              style={{ color: headerColor }}
            >

              {language === 'en' ? item?.title?.rendered : item?.acf?.title_english}


            </Link>
          </li>
        ))}
      </>
    );

  };




  function catHeader() {
    return (
      <>
        <header className={`w-full ${themeLayout == 'black' ? 'bg-black' : `theme-${currentTheme}-header-mobile`} sm:py-[30px] pt-[16px] pb-[24px] relative z-50 gap-[20px] grid [&>*]:text-white lg:hidden`}>
          <div className="container">
            <div className='flex items-center justify-between'>
              <Logo url={`/${language}`} alt={'Chuchoter Logo'} logoTitle={'Chuchoter Logo'} theme="white"

              />
              <div className='flex gap-[10px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
                <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                  {NavigationRight('page-cat', headerColor)}
                </div>
              </div>
            </div>
          </div>
          {themeLayout !== 'black' && <div className="container grid gap-[10px]">
            <h1 className='font-primary text-[10vw] capitalize'>{themeLayout}</h1>
            <p className='text-[17px] font-light'>Explore our {themeLayout}</p>
          </div>}
        </header>
        <header className={`w-full sm:py-[30px] py-[16px]  right-0 top-0 left-0 z-50 border-b border-solid border-${currentTheme}-100 bg-white lg:block hidden`} >
          <div className="container">
            <div className='flex items-center justify-between'>
              <Logo url={`/${language}`} alt={'#'} logoTitle={'#'} theme={headerColor} />

              <div className={`flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]`}>
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations(headerColor, language)}
                </ul>
                <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                  {NavigationRight('page-cat', headerColor)}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }


  function productSingleHeader() {
    return (
      <>

        <header className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50 border-b`} >
          <div className="container">
            <div className='flex items-center justify-between'>
              <Logo url={`/${language}`} alt={'#'} logoTitle={'#'} theme={headerColorLogoHome} />
              <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                  {Navigations(headerColor, language)}
                </ul>
                <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                  {NavigationRight('page-single')}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }

  let headerType;
  switch (page) {



    case "home":
      headerType = <header className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50`} >
        <div className="container">
          <div className='flex items-center justify-between'>
            <Logo url={`/${language}`} alt={'#'} logoTitle={'#'} theme={headerColorLogoHome} />
            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                {Navigations(headerColor, language)}
              </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                {NavigationRight()}
              </div>
            </div>
          </div>
        </div>
      </header>
      break;

    case "home2":
      headerType = <header className={`w-full sm:py-[30px] py-[16px] right-0 top-0 left-0 z-50`} >
        <div className="container">
          <div className='flex items-center justify-between'>
            <Logo url={`/${language}`} alt={'#'} logoTitle={'#'} theme="#c89a3f" />
            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                {Navigations(headerColor, language)}
              </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                {NavigationRight()}

              </div>
            </div>
          </div>
        </div>
      </header>
      break;

    case "category":
      headerType = catHeader()

      break

    case "product-single":
      headerType = productSingleHeader()

      break



    default:
      headerType = <header className={`w-full sm:py-[30px] py-[16px]  right-0 top-0 left-0 z-50 border-b border-solid border-gray-200 bg-white`} >
        <div className="container">
          <div className='flex items-center justify-between'>
            <Logo url={`/${language}`} alt={'#'} logoTitle={'#'} theme={color} />
            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                {Navigations(headerColor, language)}
              </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                {NavigationRight()}
              </div>
            </div>
          </div>
        </div>
      </header>
      break;
  }


  return (
    <motion.div
      className="sticky top-0 right-0 left-0 z-20"
      variants={headerVariants}
      animate={hidden ? 'hidden' : 'visible'}
    >
      {headerType}
    </motion.div>
  );
}








