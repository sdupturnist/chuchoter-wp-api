import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { CategoryData } from "@/hooks/categoryData";
import { ContactData } from "@/hooks/contactData";
import { useThemeContext } from "@/context/themeContext";
import { SubCategoryData } from "@/hooks/subCategoryData";
import { generalTranslations } from "@/utils/transalations";
import { useLanguageContext } from "@/context/LanguageContext";
import { frontendUrl } from "@/utils/variables";
import { NavigationData } from "@/hooks/navigationData";





export default function Footer({ page, initialData }) {


  const { dataCategory } = CategoryData(initialData);
  const { dataSubCategory } = SubCategoryData(initialData);
  const { dataNavigation } = NavigationData(initialData);
  const { language, toggleLanguage } = useLanguageContext();




  const { dataContact } = ContactData(initialData);

  const contactData = dataContact && dataContact?.data?.allContactInfo?.nodes[0]?.contactInfoAcf

  const { themeLayout, setThemeLayout } = useThemeContext()


  const currentTheme = themeLayout.toString().toLowerCase()

  const date = new Date();
  const year = date.getFullYear();

  const FilteredCategories = () => {
    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events'];

    const sortedCategories = dataCategory
      ? dataCategory
        .filter(item => item?.acf?.show_in_menu === true && item?.acf?.language === language) // Filter by show_in_menu and language
        .sort((a, b) => customOrder.indexOf(a.title.rendered) - customOrder.indexOf(b.title.rendered)) // Optional: sort based on customOrder
      : [];

    const filteredSubCategories = dataSubCategory
      ? dataSubCategory.filter(item => item?.acf?.show_in_menu === true && item?.acf?.language === language)
      : [];

    return (
      <>
        {sortedCategories.map((category, index) => (
          <div key={index} className={`[&>*]:text-${currentTheme}-100`}>
            <h4 className={`text-${currentTheme}-100 text-[15px] font-semibold uppercase mb-[24px]`}>
              {category?.title?.rendered}
            </h4>
            <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
              {filteredSubCategories.map((subCategory, subIndex) => (
                <li key={subIndex}>
                  <Link
                    onClick={() => {
                      setThemeLayout(subCategory?.acf?.main_cat[0]?.post_name?.replace(/-/g, '-').toLowerCase());
                    }}
                    aria-label={subCategory?.title?.rendered}
                    title={subCategory?.title?.rendered}
                    href={`/${subCategory?.acf?.main_cat[0]?.post_name?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}?sub_categories=${subCategory?.acf?.title_english?.replace(/-/g, '-').toLowerCase()}`}
                    className={`text-${currentTheme}-100 hover:opacity-50`}
                  >
                    {subCategory?.title?.rendered?.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  };


  const FilteredCategoriesAccordin = () => {
    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events'];

    const sortedCategories = dataCategory
      ? dataCategory
        .filter(item => item?.acf?.show_in_menu === true && item?.acf?.language === language) // Filter by show_in_menu and language
        .sort((a, b) => {
          const indexA = customOrder.indexOf(a?.title?.rendered);
          const indexB = customOrder.indexOf(b?.title?.rendered);
          return indexA - indexB;
        })
      : [];

    return (
      <>
        {sortedCategories.map((item, index) => (
          <div key={index} className="collapse collapse-plus rounded-none">
            <input
              type="radio"
              className="min-h-[10px] after:top-0"
              name="my-accordion-3"
              id={`category-${index}`} // Changed ID to be unique
            />
            <div className="collapse-title p-0 min-h-0">
              {item?.title?.rendered}
            </div>
            <div className="collapse-content !pb-0 px-0 mb-0">
              <ul className="mt-[24px] grid gap-[24px] m-0 p-0">
                {dataSubCategory && dataSubCategory
                  .filter(subItem => subItem?.acf?.show_in_menu === true && subItem?.acf?.language === language) // Filter for subcategories by show_in_menu and language
                  .map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        aria-label={subItem?.title?.rendered}
                        title={subItem?.title?.rendered}
                        href={`/${subItem?.acf?.main_cat[0]?.post_name?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}?sub_categories=${subItem?.acf?.title_english?.replace(/-/g, '-').toLowerCase()}`}
                        className="hover:opacity-50"
                      >
                        {subItem?.title?.rendered?.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </>
    );
  };





  const Copyrights = (theme) => {
    return (
      <>
        {theme && <p className={`text-${theme}-100`}>{generalTranslations.all_rights_reserved[language]} {year}</p>}
        {!theme && <p>{generalTranslations.all_rights_reserved[language]} {year}</p>}
      </>
    )
  }


  function Navigations() {
    return (
      <>
        <h4 className="text-[15px] font-semibold uppercase mb-[24px]"> {generalTranslations.sitemap[language]}</h4>
        <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">


          <Link
            aria-label="Home"
            title="Home"
            href={`${frontendUrl}/${language}`}
            className="hover:opacity-50"
          >
            {generalTranslations.home[language]}
          </Link>


          {dataNavigation && dataNavigation
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
                    className="hover:opacity-50"
                  >
                    {item?.title?.rendered}
                  </Link>
                </li>
              );
            })}

        </ul>
      </>
    )
  }

  function NavigationsMobile() {
    return (
      <>

        <Link
          aria-label="Home"
          title="Home"
          href={`${frontendUrl}/${language}`}
          className='hover:bg-transparent'
        >
          {generalTranslations.home[language]}
        </Link>

        <div className="accordion grid gap-[24px]">
          {FilteredCategoriesAccordin()}
        </div>

        {dataNavigation && dataNavigation
          .filter(item => item?.acf?.visible_in_menu && item?.acf?.language === language) // Filter based on visible_in_menu
          .sort((a, b) => {
            const titleA = a?.title?.rendered?.toLowerCase() || '';
            const titleB = b?.title?.rendered?.toLowerCase() || '';
            return titleA.localeCompare(titleB); // Sort titles in ascending order
          })
          .map((item, key) => {

            return (
              <Link key={key}
                aria-label={item?.title?.rendered}
                title={item?.title?.rendered}
                href={`/${item?.slug?.replace(/-ar/g, '').replace(/-en/g, '').replace(/-/g, '-').toLowerCase()}/${language}`}
              >
                {item?.title?.rendered}
              </Link>
            );
          })}


      </>
    )
  }



  function socialLinks() {
    return (<>
      <ul className="sm:[&>*]:text-[14px] text-[12px] flex sm:gap-[20px] gap-[10px] [&>*]:transition-all">
        <li>
          {contactData && <Link
            aria-label="facebook"
            title="facebook"
            href={contactData.facebook == null ? '#' : contactData.facebook}
            className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
            target="_blank"
          >
            facebook
          </Link>}
        </li>

        <li>
          {contactData && <Link
            aria-label="instagram"
            title="instagram"
            href={contactData.instagram == null ? '#' : contactData.instagram}
            className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
            target="_blank"
          >
            instagram
          </Link>}
        </li>
        <li>
          {contactData && <Link
            aria-label="snapchat"
            title="snapchat"
            href={contactData.snapchat == null ? '#' : contactData.snapchat}
            className={`hover:opacity-50 text-${currentTheme}-100 capitalize`}
            target="_blank"
          >
            snapchat
          </Link>}
        </li>
      </ul>
    </>)
  }


  function homeFooter() {
    return (<>
      <footer className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid sm:gap-[50px] gap-[30px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              {Navigations()}

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              {Copyrights()}
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden bg-events-900 border-events-100 [&>*]:text-events-100  container border-t border-solid  pt-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid gap-[20px]">
          {NavigationsMobile()}
        </div>


        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            {Copyrights()}
          </div>
          <div className="order-1 sm:order-2">
            {socialLinks()}
          </div>
        </div>
      </footer>
    </>)
  };


  function home2Footer() {
    return (<>
      <footer className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden `}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              {Navigations()}
            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? '' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              {Copyrights()}
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden  container border-t border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          {NavigationsMobile()}
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            {Copyrights()}
          </div>
          <div className="order-1 sm:order-2">
            {socialLinks()}
          </div>
        </div>
      </footer>
    </>)
  };


  function normalFooter() {
    return (<>
      <footer className={`container border-t border-${currentTheme}-100 border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              {Navigations()}
            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              {Copyrights()}
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden container border-t border-black border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          {NavigationsMobile()}
        </div>
        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[10px] justify-between border-t border-solid  pt-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            {Copyrights()}
          </div>
          <div className="order-1 sm:order-2">
            {socialLinks()}
          </div>
        </div>
      </footer>
    </>)
  };


  function catFooter() {
    return (<>
      <footer className={`container border-t border-${currentTheme}-100 border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              {Navigations()}
            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : `border-${currentTheme}-100`} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              {Copyrights(currentTheme)}
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>
      <BottomNav />
    </>)
  };

  let footerType;
  switch (page) {
    case "home":
      footerType = homeFooter()
      break;
    case 'home2':
      footerType = home2Footer()
      break;
    case 'category':
      footerType = catFooter()
      break;
    default:
      footerType = normalFooter()
      break;
  }

  return (
    <>
      {footerType}
    </>
  )
}





