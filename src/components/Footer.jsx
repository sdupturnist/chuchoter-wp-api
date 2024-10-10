import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { CategoryData } from "@/hooks/categoryData";
import { ContactData } from "@/hooks/contactData";
import { useThemeContext } from "@/context/themeContext";
import { SubCategoryData } from "@/hooks/subCategoryData";





export default function Footer({ page, initialData }) {


  const { dataCategory } = CategoryData(initialData);
  const { dataSubCategory } = SubCategoryData(initialData);

  const { dataContact } = ContactData(initialData);

  const contactData = dataContact && dataContact?.data?.allContactInfo?.nodes[0]?.contactInfoAcf

  const { themeLayout, setThemeLayout } = useThemeContext()





  const FilteredCategories = () => {
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
        <>
          <div className="">
            <h4 className="text-[15px] font-semibold uppercase mb-[24px]">{item?.title?.rendered}</h4>
            <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
              {dataSubCategory && dataSubCategory
                .filter(item => item?.acf?.show_in_menu === true) // Filter for items with show_in_menu true
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => {
                        setThemeLayout(mainCategory);
                      }}
                      aria-label={item?.title?.rendered}
                      title={item?.title?.rendered}
                      href={`/${item?.title?.rendered?.replace(/-/g, '-').toLowerCase()}`}
                      className="hover:opacity-50"
                    >
                      {item?.title?.rendered?.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}

            </ul>
          </div>
        </>
      ))
    );
  };




  const FilteredCategoriesAccordin = () => {
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
        <>




          <div key={index} className="collapse collapse-plus rounded-none">
            <input
              type="radio"
              className="min-h-[10px] after:top-0"
              name="my-accordion-3"
              id={index}
            />
            <div className="collapse-title p-0 min-h-0">
              {item?.title?.rendered}
            </div>
            <div className="collapse-content !pb-0 px-0 mb-0">
              <ul className="mt-[24px] grid gap-[24px] m-0 p-0">


                {dataSubCategory && dataSubCategory
                  .filter(item => item?.acf?.show_in_menu === true) // Filter for items with show_in_menu true
                  .map((item, index) => (
                    <li key={index}>

                      <Link
                        onClick={() => {
                          setThemeLayout(mainCategory);
                        }}
                        aria-label={item?.title?.rendered}
                        title={item?.title?.rendered}
                        href={`/${item?.title?.rendered?.replace(/-/g, '-').toLowerCase()}`}
                        className="hover:opacity-50"
                      >
                        {item?.title?.rendered?.replace(/-/g, ' ')}
                      </Link>

                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </>
      ))
    );
  };






  const date = new Date();
  const year = date.getFullYear();



  function socialLinks() {
    return (<>
      <ul className="sm:[&>*]:text-[14px] text-[12px] flex sm:gap-[20px] gap-[10px] [&>*]:transition-all">
        <li>
          {contactData && <Link
            aria-label="facebook"
            title="facebook"
            href={contactData.facebook == null ? '#' : contactData.facebook}
            className="hover:opacity-50"
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
            className="hover:opacity-50"
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
            className="hover:opacity-50"
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
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blogs" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden bg-events-900 border-events-100 [&>*]:text-events-100  container border-t border-solid  pt-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid gap-[20px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>

          {dataCategory?.data?.shops?.data?.length !== 0 ? <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div> : null}
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/careers"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blogs"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
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
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? '' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden  container border-t border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>

          <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div>
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/about"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blog"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
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
      <footer className={`container border-t border-black border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>

                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              {socialLinks()}
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden container border-t border-black border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>

          <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div>
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/careers"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blogs"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[10px] justify-between border-t border-solid  pt-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
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
      <footer className={`container border-t border-black border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
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





