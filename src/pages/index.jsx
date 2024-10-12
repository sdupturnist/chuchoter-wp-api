import { adminUrl, wordpressGraphQlApiUrl, frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import Link from "next/link";
import Images from '@/components/Images';
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/themeContext";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import Header from "@/components/Header";
import Slider from "react-slick";
import Card from "@/components/Cards";
import useWindowWidth from "@/components/WindowWidth";
import { AOSInit } from "@/components/Aos";
import axios from "axios";


gsap.registerPlugin(useGSAP, ScrollTrigger);


export default function Home({ featuredProducts, pageData, homeSections }) {



  const { setThemeLayout } = useThemeContext()


  const chocolate = useRef();
  const flowers = useRef();
  const cakes = useRef();
  const events = useRef();

  const windowWidth = useWindowWidth();


  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-chocolate .wrpr .chocolate-image-1');
      const imageRight = gsap.utils.toArray('.section-chocolate .wrpr .chocolate-image-2');
      const content = gsap.utils.toArray('.section-chocolate .wrpr .content');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {
            x: 100,
            opacity: 0.9,
            y: 170
          },
          {
            opacity: 0,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 0, // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



      imageRight.forEach((box) => {
        gsap.fromTo(box,
          {
            x: -50,
            opacity: 0.9,
            y: -70
          },
          {
            opacity: 0,
            x: -50,
            y: -200,
            scrollTrigger: {
              trigger: box,
              start: 0, // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });


    },
    {
      scope: chocolate
    }
  );


  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-flowers .wrpr .chocolate-image-1');
      const content = gsap.utils.toArray('.section-flowers .wrpr .content');
      const content2 = gsap.utils.toArray('.section-flowers .wrpr .content2');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {

            opacity: 0,
            y: -1000,

          },
          {
            opacity: 0.8,
            x: 0,
            y: 0,

            scrollTrigger: {
              trigger: box,
              start: '+=100',
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



    },
    {
      scope: flowers
    }
  );

  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-cakes .wrpr .cakes-image-1');
      const imageRight = gsap.utils.toArray('.section-cakes .wrpr .cakes-image-2');
      const content = gsap.utils.toArray('.section-cakes .wrpr .content');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {
            x: 400,
            opacity: 0.3,
            y: 200
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



      imageRight.forEach((box) => {
        gsap.fromTo(box,
          {
            x: -100,
            opacity: 0.3,
            y: -500
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });


    },
    {
      scope: cakes
    }
  );

  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-events .wrpr .events-image-1');
      const content = gsap.utils.toArray('.section-events .wrpr .content');




      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {

            filter: 'grayscale(100%)',
            opacity: 0,
            y: -1000,

          },
          {
            filter: 'grayscale(30%)',
            opacity: 0.8,
            x: 0,
            y: 0,

            scrollTrigger: {
              trigger: box,
              start: '+=100',
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



    },
    {
      scope: events
    }
  );





  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Example: Add custom logic to manage aria-hidden
    if (slider) {
      const updateAriaHidden = () => {
        const slides = slider.querySelectorAll('.slick-slide');
        slides.forEach((slide) => {
          const isVisible = slide.classList.contains('slick-active');
          slide.setAttribute('aria-hidden', !isVisible);
        });
      };

      slider.addEventListener('afterChange', updateAriaHidden);
      return () => {
        slider.removeEventListener('afterChange', updateAriaHidden);
      };
    }
  }, []);




  const featuredProductsSlider = {
    dots: false,
    // fade: true,
    infinite: true,
    autoplay: true,
    loop: true,
    lazyLoad: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,

  };




  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout
        page="home2"
        header="color"
      >
        <AOSInit />
        {/* LARGE DEVICES */}
        <>

          <section
            ref={chocolate}
            className="section-chocolate lg:min-h-screen bg-chocolates-900  items-start grid text-chocolates-100 relative overflow-hidden sm:pb-[100px] pb-[50px]  text-center xl:text-start py-">
            <Header
              page="home2"
              theme='chocolate'
            />
            <h2 className="text-red-600">
             full check<br />
              arabci rtl<br />
              api change with trasalation<br />
              remove console.log<br />
            </h2>
            <div className="wrpr sm:pt-[100px] pt-[80px]">
              <Images
                width={190}
                height={290}
                quality={100}
                placeholder={true}
                classes={'chocolate-image-1 max-width-[100%] absolute top-0 left-[2%] hidden xl:block max-w-[150px]'}
                imageurl={homeSections[3]?.acf?.banner1?.url ? homeSections[3]?.acf?.banner1?.url : ''}
                alt={homeSections[3]?.acf?.banner1?.alt || 'Default title text'}
                title={homeSections[3]?.acf?.banner1?.alt || 'Default title text'}
              />
              <div className="container relative z-[1] content">
                <div className="mx-auto 2xl:w-[80%] xl:w-[90%] grid gap-[20px] px-[20px]">
                  <div className="w-[100%]">
                    <h1 className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] mt-[-50px] xl:pl-[20%]" data-aos="fade-up">
                      <span className="text-[6vw] font-secondary leading-[1.4] xl:ml-[5%] xl:text-end block pb-[40px] xl:pb-[0]">
                        {homeSections && homeSections[3]?.acf?.category}

                       
                      </span>
                      <span className="mt-[-50px] block">
                        {homeSections && homeSections[3]?.title.rendered}
                      </span>
                    </h1>
                    <div
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <Images
                        width={300}
                        height={300}
                        quality={100}
                        placeholder={false}
                        imageurl={`/images/chocolates-hero-bg_new3.webp`}
                        classes={'mx-auto w-full block xl:hidden my-[30px] max-w-[330px]'}
                        alt={homeSections[3]?.acf?.banner1?.alt || 'Default title text'}
                        title={homeSections[3]?.acf?.banner1?.alt || 'Default title text'}
                      />
                    </div>
                    <div className="grid gap-[30px] sm:mt-[50px] mt-[20px]" data-aos="fade-up" data-aos-delay="500">
                      <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[65%] tracking-[3%] sm:leading-[1.6] leading-[1.8] uppercase">
                        <div dangerouslySetInnerHTML={{ __html: homeSections && homeSections[3]?.content?.rendered }} />
                      </div>
                      <div>
                        <Link
                          aria-label={homeSections && homeSections[3]?.acf?.category}
                          title={homeSections && homeSections[3]?.acf?.category}
                          href={`/${homeSections && homeSections[3].acf.category.toString().toLowerCase()}`}
                          onClick={(e) => setThemeLayout(homeSections && homeSections[3]?.acf?.category)}
                          className="btn btn-lg px-[40px] bg-transparent border border-solid border-chocolates-100 hover:bg-chocolates-100 text-chocolates-100 hover:border-chocolates-100 hover:text-white rounded-full"
                        >
                          Shop Now
                        </Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Images
                width={388}
                height={489}
                quality={100}
                placeholder={true}
                classes={'chocolate-image-2 max-width-[100%] block lg:absolute bottom-[0%] right-[0%] hidden xl:block max-w-[250px]'}
                imageurl={homeSections[3]?.acf?.banner2?.url ? homeSections[3]?.acf?.banner2?.url : ''}
                alt={homeSections[3]?.acf?.banner2?.alt || 'Default title text'}
                title={homeSections[3]?.acf?.banner2?.alt || 'Default title text'}
              />
            </div>
          </section>
          <section
            ref={flowers}
            className="section-flowers lg:min-h-screen bg-flowers-900 xl:py-[150px] pt-[50px] items-center grid text-flowers-100 text-center relative overflow-hidden">
            <div className="wrpr">
              <div className="container z-[1] relative">
                <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px] px-[20px]">
                  <div >
                    <div className="content z-20 relative" data-aos="fade-up">
                      <h2 className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] xl:mt-[-50px] sm:pt-[100px] pt-[50px] xl:pt-[0]">
                        <span className="text-[6vw] font-secondary leading-[1.4] xl:ml-[5%]  block pb-[40px] xl:pb-[0]">
                          {homeSections && homeSections[2]?.acf?.category}
                        </span>
                        <span className="mt-[-50px] block">
                          {homeSections && homeSections[2]?.title.rendered}
                        </span>
                      </h2>
                    </div>
                    <Images
                      width={707}
                      height={829}
                      quality={100}
                      placeholder={true}
                      classes={'chocolate-image-1 max-width-[100%] block mx-auto  bottom-[5%] right-0 left-0 z-[-1] hidden xl:block'}
                      imageurl={homeSections[2]?.acf?.banner1?.url ? homeSections[2]?.acf?.banner1?.url : ''}
                      alt={homeSections[2]?.acf?.banner1?.alt || 'Default title text'}
                      title={homeSections[2]?.acf?.banner1?.alt || 'Default title text'}
                    />

                    <div className="content2" data-aos="fade-up">
                      <div className="grid gap-[30px] xl:mt-[50px] mt-[30px]">
                        <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[85%] tracking-[3%] sm:leading-[1.6] leading-[1.7] uppercase mx-auto">
                          <p className="">
                            <div dangerouslySetInnerHTML={{ __html: homeSections && homeSections[2]?.content?.rendered }} />
                          </p>
                        </div>
                        <div >
                          <Link
                            aria-label={homeSections && homeSections[2]?.acf?.category}
                            title={homeSections && homeSections[2]?.acf?.category}
                            href={`/${homeSections && homeSections[2].acf.category.toString().toLowerCase()}`}
                            onClick={(e) => setThemeLayout(homeSections && homeSections[2]?.acf?.category)}
                            className="btn btn-lg px-[40px] bg-transparent border border-solid border-flowers-100 hover:bg-flowers-100 text-flowers-100 hover:border-flowers-100 hover:text-white rounded-full"
                          >
                            Shop Now
                          </Link>

                          <Images
                            width={300}
                            height={300}
                            quality={100}
                            placeholder={false}
                            imageurl={`/images/flowers-hero-bg.webp`}
                            classes={'mx-auto w-full block xl:hidden'}
                            alt={homeSections[2]?.acf?.banner1?.alt || 'Default title text'}
                            title={homeSections[2]?.acf?.banner1?.alt || 'Default title text'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            ref={cakes}
            className="section-cakes lg:min-h-screen bg-cakes-900  items-center grid text-cakes-100 relative overflow-hidden sm:py-[100px] py-[50px] text-center xl:text-start">
            <div className="wrpr sm:pt-[0] pt-[0]">
              <Images
                width={190}
                height={290}
                quality={100}
                placeholder={true}
                classes={'cakes-image-1 max-width-[100%] absolute top-0 left-[2%] hidden xl:block'}
                imageurl={homeSections[1]?.acf?.banner1?.url ? homeSections[1]?.acf?.banner1?.url : ''}
                alt={homeSections[1]?.acf?.banner1?.alt || 'Default title text'}
                title={homeSections[1]?.acf?.banner1?.alt || 'Default title text'}

              />
              <div className="container relative z-[1] content">
                <div className="mx-auto 2xl:w-[80%] xl:w-[90%] grid gap-[20px] px-[20px]">
                  <div className="w-[100%]">
                    <h2 data-aos="fade-up" className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] xl:mt-[-50px] xl:pl-[20%] sm:pt-[50px] pt-[50px] xl:pt-[0]">
                      <span className="text-[6vw] font-secondary leading-[1.4] xl:ml-[5%] xl:text-end block pb-[40px] xl:pb-[0]">
                        {homeSections && homeSections[1]?.acf?.category}
                      </span>
                      <span className="mt-[-50px] block">
                        {homeSections && homeSections[1]?.title.rendered}
                      </span>
                    </h2>
                    <div className="grid gap-[30px] sm:mt-[50px] mt-[20px]" data-aos="fade-up" data-aos-delay="500">
                      <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[65%] tracking-[3%] sm:leading-[1.6] leading-[1.8] uppercase">
                        <p className="">
                          <div dangerouslySetInnerHTML={{ __html: homeSections && homeSections[1]?.content?.rendered }} />
                        </p>
                      </div>
                      <div>
                        <Link
                          aria-label={homeSections && homeSections[1]?.acf?.category}
                          title={homeSections && homeSections[1]?.acf?.category}
                          href={`/${homeSections && homeSections[1].acf.category.toString().toLowerCase()}`}
                          onClick={(e) => setThemeLayout(homeSections && homeSections[1]?.acf?.category)}
                          className="btn btn-lg px-[40px] bg-transparent border border-solid border-cakes-100 hover:bg-cakes-100 text-cakes-100 hover:border-cakes-100 hover:text-white rounded-full"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <Images
                  width={300}
                  height={300}
                  quality={100}
                  placeholder={false}
                  imageurl={`/images/cakes-hero-bg-1.webp`}
                  classes={'mx-auto w-full block xl:hidden mx-auto max-w-[300px] mt-[30px]'}
                  alt={homeSections[1]?.acf?.banner1?.alt || 'Default title text'}
                  title={homeSections[1]?.acf?.banner1?.alt || 'Default title text'}
                />
              </div>
              <Images
                width={388}
                height={489}
                quality={100}
                placeholder={true}
                classes={'cakes-image-2 max-width-[100%] block lg:absolute bottom-[5%] right-[2%] hidden xl:block'}
                imageurl={homeSections[1]?.acf?.banner1?.url ? homeSections[1]?.acf?.banner2?.url : ''}
                alt={homeSections[1]?.acf?.banner2?.alt || 'Default title text'}
                title={homeSections[1]?.acf?.banner2?.alt || 'Default title text'}
              />

            </div>
          </section>
          <section
            ref={events}
            className="section-events lg:min-h-screen bg-events-900 xl:py-[150px] pt-[50px] items-center grid text-events-100 text-center relative overflow-hidden">
            <div className="wrpr">
              <div className="container z-[1] relative">
                <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px] px-[20px]">
                  <div >
                    <div className="content z-20 relative" data-aos="fade-up">
                      <h2 className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] xl:mt-[-50px] sm:pt-[100px] pt-[50px] xl:pt-[0]">
                        <span className="text-[6vw] font-secondary leading-[1.4] xl:ml-[5%]  block pb-[40px] xl:pb-[0]">
                          {homeSections && homeSections[0]?.acf?.category}
                        </span>
                        <span className="mt-[-50px] block">
                          {homeSections && homeSections[0]?.title.rendered}
                        </span>
                      </h2>
                    </div>
                    <div className="overflow-hidden events-image-1 mx-auto h-[70vh] w-[50%] hidden xl:block">
                      <Images
                        width={707}
                        height={829}
                        quality={100}
                        placeholder={true}
                        classes={'chocolate-image-1 max-width-[100%] block mx-auto  bottom-[5%] right-0 left-0 z-[-1] hidden xl:block'}
                        imageurl={homeSections[0]?.acf?.banner1?.url ? homeSections[0]?.acf?.banner1?.url : ''}
                        alt={homeSections[0]?.acf?.banner1?.alt || 'Default title text'}
                        title={homeSections[0]?.acf?.banner1?.alt || 'Default title text'}
                      />
                    </div>

                    <div className="content2" data-aos="fade-up">
                      <div className="grid gap-[30px] xl:mt-[50px] mt-[10px]">
                        <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[85%] mx-auto tracking-[3%] sm:leading-[1.6] leading-[1.7] uppercase">
                          <p className="">
                            <div dangerouslySetInnerHTML={{ __html: homeSections && homeSections[0]?.content?.rendered }} />
                          </p>
                        </div>
                        <div>
                          <Link
                            aria-label={homeSections && homeSections[0]?.acf?.category}
                            title={homeSections && homeSections[0]?.acf?.category}
                            href={`/${homeSections && homeSections[0].acf.category.toString().toLowerCase()}`}
                            onClick={(e) => setThemeLayout(homeSections && homeSections[0]?.acf?.category)}
                            className="btn btn-lg px-[40px] bg-transparent border border-solid border-events-100 hover:bg-events-100 text-events-100 hover:border-events-100 hover:text-white rounded-full"
                          >
                            Shop Now
                          </Link>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <Images
                  width={300}
                  height={300}
                  quality={100}
                  placeholder={false}
                  imageurl={`/images/events-hero-bg-1.webp`}
                  classes={'mx-auto w-full block xl:hidden'}
                  alt={homeSections[1]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                  title={homeSections[1]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                />
              </div>
            </div>
          </section>
          {featuredProducts.length !== 0 && windowWidth > 999 ? <section>

            <div className="container" data-aos="fade-in">
              <div className="mx-auto 2xl:w-[70%] xl:w-[90%]  gap-[20px] md:py-[60px] py-[50px]">
                <h2 className="text-[16px] uppercase font-semibold mb-[30px]">Featured products</h2>
                <div className="slider-container slider-featured-items mt-[30px]">



                  <Slider {...featuredProductsSlider}>

                    {featuredProducts && featuredProducts?.data
                      .filter(item => item?.acf?.featured === true) // Filter for items with show_in_menu true
                      .map((item, index) => (
                        <>
                          <Card
                            key={index}
                            theme="chocolates"
                            item={item}
                          />

                        </>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
            : null
          }
          <section data-aos="fade-in">
            <div className="container">
              <div className={`mx-auto 2xl:w-[70%] xl:w-[90%] grid sm:gap-[20px] gap-[16px] md:py-[60px] py-[30px] justify-end ${featuredProducts.length !== 0 && windowWidth > 999 ? 'border-t border-solid border-black ' : null}`}>
                <div className="md:pl-[15%]">
                  <h3 className="md:text-[30px] sm:text-[26px] text-[22px] uppercase font-medium">
                    {pageData && pageData?.title.rendered}
                  </h3>
                </div>
                <div className="grid gap-[8px] sm:gap-[4px] md:pl-[40%]">
                  <div dangerouslySetInnerHTML={{ __html: pageData && pageData?.content?.rendered }} />
                  <Link
                    href="/about"
                    aria-label="About"
                    title="About"
                    className="font-secondary text-[50px]"
                  >
                    read full
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      </Layout>
    </>
  );
}


export async function getStaticProps() {
  try {
    const homeRes = await axios.get(`${frontendUrl}/api/home`);
    const homeSectionsRes = await axios.get(`${frontendUrl}/api/homeSections`);
    const featuredProductsRes = await axios.get(`${frontendUrl}/api/products`);

    return {
      props: {
        pageData: homeRes.data,
        homeSections: homeSectionsRes.data,
        featuredProducts: featuredProductsRes.data,
      },
      revalidate: 60, // revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        pageData: [],
        homeSections: [],
        featuredProducts: [],
      },
      revalidate: 60, // still revalidate even on error
    };
  }
}