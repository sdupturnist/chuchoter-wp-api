"use client"
import Link from 'next/link';
import Logo from './Logo';
import { motion, useViewportScroll } from 'framer-motion';
import { useModalContext } from '@/context/modalContext';
import { useState, useEffect, useRef } from 'react';
import { useThemeContext } from '@/context/themeContext';
import { useCartContext } from '@/context/cartContext';
import { CategoryData } from '@/hooks/categoryData';
import SearchBox from './Search';
import LanguageSwitch from './LangaugeSwitch';
import { NavigationData } from '@/hooks/navigationData';




export default function Nav({ theme, page, initialData }) {


  const { setModalFor, setShowModal } = useModalContext();
  const { themeLayout, setThemeLayout } = useThemeContext();
  const { cartItems } = useCartContext();


  const { dataCategory } = CategoryData(initialData);
  const { dataNavigation } = NavigationData(initialData);

  const currentTheme = themeLayout.toString().toLowerCase()


  // TOGGLE MENU
  const [hidden, setHidden] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const { scrollY } = useViewportScroll();


  const cartCount = cartItems && cartItems.length


  const currentCartCOunt = cartCount == null ? 0 : cartCount

  const color = "#c89a3f"

  console.log(dataNavigation)


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


  function Navigations(color) {
    return (
      <>
   <Link
          aria-label="Home"
          title="Home"
          href="/"
          onClick={() => setThemeLayout('gray')}
          style={{
            color
          }}
        >
          Home
        </Link>
        {FilteredCategories(headerColor)}
        {dataNavigation && dataNavigation
          .filter(item => item?.acf?.visible_in_menu) // Filter based on visible_in_menu
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
                  href={item?.title?.rendered.toLowerCase().replace(/ /g, '-')}
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

  //console.log(dataCategory)


  const FilteredCategories = (headerColor) => {
    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events'];

    const sortedCategories = dataCategory
      ? dataCategory
        .filter(item => item?.acf?.show_in_menu === true) // Ensure show_in_menu is true
        .sort((a, b) => {
          const indexA = customOrder.indexOf(a?.title?.rendered);
          const indexB = customOrder.indexOf(b?.title?.rendered);
          return indexA - indexB;
        })
      : [];

    return (
      sortedCategories.map((item, index) => (
        <li key={index}>
          <Link
            aria-label={item?.title?.rendered}
            title={item?.title?.rendered}
            href={`/${item?.title?.rendered.toLowerCase()}`}
            onClick={(e) => setThemeLayout(item?.title?.rendered.toLowerCase())}
            style={{ color: headerColor }}
          >
            {item?.title?.rendered}
          </Link>
        </li>
      ))
    );
  };




  function catHeader() {
    return (
      <>
        <header className={`w-full ${themeLayout == 'black' ? 'bg-black' : `theme-${currentTheme}-header-mobile`} sm:py-[30px] pt-[16px] pb-[24px] relative z-50 gap-[20px] grid [&>*]:text-white lg:hidden`}>
          <div className="container">
            <div className='flex items-center justify-between'>
              <Logo url={'/'} alt={'Chuchoter Logo'} logoTitle={'Chuchoter Logo'} theme="white"

              />
              <div className='flex gap-[10px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
                <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                  <Link href={"/cart"} className='hover:bg-transparent mr-2 mr-sm-0'>CART ({currentCartCOunt})</Link>
                  <SearchBox
                    theme={headerColor}
                    page={'category'}
                  />

                  <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
                      <path stroke="#fff" strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
                    </svg>
                  </button>
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
              <Logo url={'#'} alt={'#'} logoTitle={'#'} theme={headerColor} />

              <div className={`flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]`}>
                <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
                {Navigations(headerColor)}
                  {/* <li><Link aria-label='Home' title='Home' href={"/"} onClick={(e) => setThemeLayout('gray')} style={{ color: headerColor }}>Home</Link></li> */}
                  {/* {FilteredCategories(headerColor)} */}
                  {/* <li><Link aria-label='About' title='About' href={"/about"} onClick={(e) => setThemeLayout('gray')} style={{ color: headerColor }}>About</Link></li> */}
                  {/* <li><Link aria-label='Careers' title='Careers' href={"/careers"} onClick={(e) => setThemeLayout('gray')} style={{ color: headerColor }}>Careers</Link></li> */}
                  {/* <!~~ <li><Link aria-label='Blog' title='Blog' href={"/blogs"} onClick={(e) => setThemeLayout('gray')} style={{ color: headerColor }}>Blog</Link></li> ~~> */}
                  {/* <li><Link aria-label='Contact' title='Vontact' href={"/contact"} onClick={(e) => setThemeLayout('gray')} style={{ color: headerColor }}>Contact</Link></li> */}
                </ul>
                <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                  <Link href={"/cart"} className={`mr-2 mr-sm-0`} style={{ color: headerColor }}>CART ({currentCartCOunt})</Link>
                  <SearchBox
                    theme={headerColor}
                    page={'category'}
                  />
                  <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
                      <path stroke={`${headerColor}`} strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
                    </svg>
                  </button>
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
            <Logo url={'#'} alt={'#'} logoTitle={'#'} theme={headerColorLogoHome} />
            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
              
              {Navigations()}


                {/* <li><Link aria-label='Home' title='Home' href={"/"} onClick={(e) => setThemeLayout('gray')}>Home</Link></li> */}
                {/* {FilteredCategories(headerColor)} */}
                {/* <li><Link aria-label='About' title='About' href={"/about"} onClick={(e) => setThemeLayout('gray')}>About</Link></li> */}
                {/* <li><Link aria-label='Careers' title='Careers' href={"/careers"} onClick={(e) => setThemeLayout('gray')}>Careers</Link></li> */}
                {/* <!~~ <li><Link aria-label='Blog' title='Blog' href={"/blogs"} onClick={(e) => setThemeLayout('gray')}>Blog</Link></li> ~~> */}
                {/* <li><Link aria-label='Contact' title='Vontact' href={"/contact"} onClick={(e) => setThemeLayout('gray')}>Contact</Link></li> */}
              </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                <Link href={"/cart"} className={`mr-2 mr-sm-0`}>CART ({currentCartCOunt})</Link>
                <SearchBox
                  theme={theme}
                  page={'home'}
                />
                <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
                    <path stroke={`${headerColor}`} strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
                  </svg>
                </button>
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
            <Logo url={'#'} alt={'#'} logoTitle={'#'} theme="#c89a3f" />
            <LanguageSwitch
              label="test language toggle"
            />

            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
 {Navigations()}
  </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                <Link href={"/cart"} className={`mr-2 mr-sm-0`}>CART ({currentCartCOunt})</Link>
                <SearchBox
                  theme={headerColor}
                  page={page}
                />
                <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
                    <path stroke={`#c89a3f`} strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      break;

    case "category":
      headerType = catHeader()

      break


    default:
      headerType = <header className={`w-full sm:py-[30px] py-[16px]  right-0 top-0 left-0 z-50 border-b border-solid border-gray-200 bg-white`} >
        <div className="container">
          <div className='flex items-center justify-between'>
            <Logo url={'#'} alt={'#'} logoTitle={'#'} theme={color} />
            <div className='flex gap-[24px] items-center font-semibold text-[14px] uppercase [&>li>*]:rounded-[4px] [&>summary>*]:rounded-[4px]'>
              <ul className="xl:flex hidden gap-[24px] items-center justify-end nav-list">
              {Navigations(headerColor)}
                
                {/* <li><Link aria-label='Home' title='Home' href={"/"} onClick={(e) => setThemeLayout('gray')} */}
                  {/* style={{ */}
                    {/* color: headerColor */}
                  {/* }} */}
                {/* >Home</Link></li> */}
                {/* {FilteredCategories(headerColor)} */}
                {/* <li><Link aria-label='About' title='About' href={"/about"} onClick={(e) => setThemeLayout('gray')} */}
                  {/* style={{ */}
                    {/* color: headerColor */}
                  {/* }} */}
                {/* >About</Link></li> */}
                {/* <li><Link aria-label='Careers' title='Careers' href={"/careers"} onClick={(e) => setThemeLayout('gray')} */}
                  {/* style={{ */}
                    {/* color: headerColor */}
                  {/* }} */}
                {/* >Careers</Link></li> */}
                {/* <!~~ <li><Link aria-label='Blog' title='Blog' href={"/blogs"} onClick={(e) => setThemeLayout('gray')}>Blog</Link></li> ~~> */}
                {/* <li><Link aria-label='Contact' title='Vontact' href={"/contact"} onClick={(e) => setThemeLayout('gray')} */}
                  {/* style={{ */}
                    {/* color: headerColor */}
                  {/* }} */}
                {/* >Contact</Link></li> */}
              </ul>
              <div className='flex items-center xl:gap-[50px] sm:gap-[20px] gap-[8px]'>
                <Link href={"/cart"} className={`mr-2 mr-sm-0`}
                  style={{
                    color: headerColor
                  }}
                >CART ({currentCartCOunt})</Link>
                <SearchBox
                  theme={headerColor}
                />
                <button aria-label='Navigation Menu' title='Navigation Menu' className="btn btn-link hover:bg-gray-100 !bg-transparent !border-none xl:hidden" onClick={openNavigationModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" fill="none" viewBox="0 0 21 14">
                    <path stroke={`${color}`} strokeLinecap="round" strokeWidth="1.5" d="M.75 1.573h19.5m-19.5 5.5h19.5m-19.5 5.5h19.5" />
                  </svg>
                </button>
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








