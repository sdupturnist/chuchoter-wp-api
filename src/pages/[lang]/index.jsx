import {
  adminUrl,
  wordpressGraphQlApiUrl,
  frontendUrl,
  catUrl,
  transalateText,
} from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from "@/components/Seo";
import Link from "next/link";
import Images from "@/components/Images";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/themeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Header from "@/components/Header";
import Slider from "react-slick";
import Card from "@/components/Cards";
import useWindowWidth from "@/components/WindowWidth";
import { AOSInit } from "@/components/Aos";
import axios from "axios";
import { useLanguageContext } from "@/context/LanguageContext";
import translations from "@/hooks/translations";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSiteContext } from "@/context/siteContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home({ featuredProducts, pageData, homeSections }) {
  const { siteTransalations } = useSiteContext();
  const { language, toggleLanguage } = useLanguageContext();
  const t = translations[language];

  const { setThemeLayout } = useThemeContext();

  const chocolate = useRef();
  const flowers = useRef();
  const cakes = useRef();
  const events = useRef();

  const windowWidth = useWindowWidth();

  useGSAP(
    () => {
      const imageLeft = gsap.utils.toArray(
        ".section-chocolates .wrpr .image-1"
      );
      const imageRight = gsap.utils.toArray(
        ".section-chocolates .wrpr .image-2"
      );
      const content = gsap.utils.toArray(".section-chocolates .wrpr .content");

      imageLeft.forEach((box) => {
        gsap.fromTo(
          box,
          {
            // x: 100,
            opacity: 0.9,
            y: 170,
          },
          {
            opacity: 0,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 0, // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              // markers: true,
            },
          }
        );
      });

      imageRight.forEach((box) => {
        gsap.fromTo(
          box,
          {
            // x: -50,
            opacity: 0.9,
            y: -70,
          },
          {
            opacity: 0,
            x: -50,
            y: -200,
            scrollTrigger: {
              trigger: box,
              start: 0, // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              // markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(
          box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });
    },
    {
      scope: chocolate,
    }
  );

  useGSAP(
    () => {
      const imageLeft = gsap.utils.toArray(".section-flowers .wrpr .image-1");
      const content = gsap.utils.toArray(".section-flowers .wrpr .content");
      const content2 = gsap.utils.toArray(".section-flowers .wrpr .content2");

      imageLeft.forEach((box) => {
        gsap.fromTo(
          box,
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
              start: "+=100",
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              // markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(
          box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });
    },
    {
      scope: flowers,
    }
  );

  useGSAP(
    () => {
      const imageLeft = gsap.utils.toArray(".section-cakes .wrpr .image-1");
      const imageRight = gsap.utils.toArray(".section-cakes .wrpr .image-2");
      const content = gsap.utils.toArray(".section-cakes .wrpr .content");

      imageLeft.forEach((box) => {
        gsap.fromTo(
          box,
          {
            // x: 400,
            opacity: 0.3,
            y: 200,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      imageRight.forEach((box) => {
        gsap.fromTo(
          box,
          {
            //  x: -100,
            opacity: 0.3,
            y: -500,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(
          box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });
    },
    {
      scope: cakes,
    }
  );

  useGSAP(
    () => {
      const imageLeft = gsap.utils.toArray(".section-events .wrpr .image-1");
      const content = gsap.utils.toArray(".section-events .wrpr .content");

      imageLeft.forEach((box) => {
        gsap.fromTo(
          box,
          {
            filter: "grayscale(100%)",
            opacity: 0,
            y: -1000,
          },
          {
            filter: "grayscale(30%)",
            opacity: 0.8,
            x: 0,
            y: 0,

            scrollTrigger: {
              trigger: box,
              start: "+=100",
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(
          box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: "top top", // Start when the top of the box hits the top of the viewport
              end: "bottom top", // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });
    },
    {
      scope: events,
    }
  );

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Example: Add custom logic to manage aria-hidden
    if (slider) {
      const updateAriaHidden = () => {
        const slides = slider.querySelectorAll(".slick-slide");
        slides.forEach((slide) => {
          const isVisible = slide.classList.contains("slick-active");
          slide.setAttribute("aria-hidden", !isVisible);
        });
      };

      slider.addEventListener("afterChange", updateAriaHidden);
      return () => {
        slider.removeEventListener("afterChange", updateAriaHidden);
      };
    }
  }, []);

  const featuredProductsSlider = {
    dots: false,
    // fade: true,
    rtl: true,
    infinite: true,
    autoplay: true,
    loop: true,
    lazyLoad: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const filteredSectionsByLanguage = homeSections
    ? homeSections.filter((item) => item?.acf?.language === language)
    : [];

  // Define the desired order
  const categoryOrder = ["chocolates", "flowers", "cakes", "events"];

  // Sort the sections based on the defined order
  const sortedSections = [...filteredSectionsByLanguage].sort((a, b) => {
    const categoryA = a?.acf?.cateogary;
    const categoryB = b?.acf?.cateogary;
    return categoryOrder.indexOf(categoryA) - categoryOrder.indexOf(categoryB);
  });

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const items = featuredProducts?.data
    .filter(
      (item) => item?.acf?.featured === true && item?.acf?.language === language
    ) // Filter for featured items
    .map((item, index) => (
      <div className="item" key={index} data-value={index}>
        <Card
          theme="chocolates"
          item={item}
          subCat={item?.acf?.sub_categories[0]
            ?.toLowerCase()
            .replace(/\s+/g, "")}
        />
      </div>
    ));

  return (
    <>
      <Metatags seo={pageData && pageData[0]?.yoast_head_json} />
      <Layout page="home2" header="color">
        <AOSInit />
        {/* LARGE DEVICES */}
        <>
          {sortedSections.map((item, index) => {
            const isOdd = index % 2 !== 0;

            const category = item?.acf?.cateogary;

            // Determine which ref to use based on the category
            let currentRef;
            if (category === "flowers") {
              currentRef = flowers;
            } else if (category === "chocolates") {
              currentRef = chocolate;
            } else if (category === "cakes") {
              currentRef = cakes;
            } else if (category === "events") {
              currentRef = events;
            }

            let color_bg;

            if (category === "flowers") {
              color_bg = "#fdd9d9";
            } else if (category === "chocolates") {
              color_bg = "#FCF9F4";
            } else if (category === "cakes") {
              color_bg = "#fffbe8";
            } else if (category === "events") {
              color_bg = "#eaf4f3";
            }

            let color_text;

            if (category === "flowers") {
              color_text = "#E62263";
            } else if (category === "chocolates") {
              color_text = "#c89a3f";
            } else if (category === "cakes") {
              color_text = "#E79F02";
            } else if (category === "events") {
              color_text = "#258F89";
            }

            return (
              <>
                {!isOdd ? (
                  <section
                    key={index}
                    ref={currentRef}
                    className={`
              section-${item?.acf?.cateogary}
              lg:min-h-screen
              ${
                index === 0
                  ? `
              xl:pb-[150px]
              pb-[50px]
              `
                  : `
              xl:py-[150px]
              py-[50px]
              `
              }
              items-center
              grid
              lg:text-start 
              text-center 
              relative
              overflow-hidden`}
                    style={{
                      background: color_bg,
                      color: color_text,
                    }}>
                    {index === 0 ? (
                      <Header page="home2" theme="chocolate" />
                    ) : null}

                    <div className="wrpr sm:pt-[100px] pt-[80px]">
                      <Images
                        width={190}
                        height={290}
                        quality={100}
                        placeholder={true}
                        classes={`image-1 max-width-[100%] absolute top-0 ${
                          language == "en" ? "left-[10%]" : "right-[2%]"
                        } hidden xl:block max-w-[150px] `}
                        imageurl={item?.acf?.banner1?.url || ""}
                        alt={item?.acf?.banner1?.alt || "Default title text"}
                        title={item?.acf?.banner1?.alt || "Default title text"}
                      />
                      <div className="container relative z-[1] content">
                        <div className="mx-auto 2xl:w-[80%] xl:w-[90%] grid gap-[20px] px-[20px]">
                          <div className="w-[100%]">
                            <h1 className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] mt-[-50px] xl:pl-[20%]">
                              <span
                                className={`${
                                  language === "en"
                                    ? "text-[6vw] pb-[40px] xl:pb-[0] xl:text-end"
                                    : "text-[3vw] pb-[70px]"
                                } font-secondary leading-[1.4] xl:ml-[5%] block`}>
                                {transalateText(
                                  siteTransalations?.catTranslations?.[
                                    item?.acf?.cateogary
                                  ],
                                  language
                                )}
                              </span>
                              <span className="mt-[-50px] block">
                                {item?.title.rendered}
                              </span>
                            </h1>
                            <div>
                              <Images
                                width={500}
                                height={500}
                                quality={100}
                                placeholder={false}
                                imageurl={`/images/${item?.acf?.cateogary}-hero.webp`}
                                classes={
                                  "mx-auto w-full block xl:hidden my-[30px] max-w-[500px]"
                                }
                                alt={
                                  item?.acf?.banner1?.alt ||
                                  "Default title text"
                                }
                                title={
                                  item?.acf?.banner1?.alt ||
                                  "Default title text"
                                }
                              />
                            </div>
                            <div className="grid gap-[30px] sm:mt-[50px] mt-[20px]">
                              <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[65%] tracking-[3%] sm:leading-[1.6] leading-[1.8] uppercase">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item?.content?.rendered,
                                  }}
                                />
                              </div>
                              <div>
                                <Link
                                  aria-label={item?.acf?.cateogary}
                                  title={item?.acf?.cateogary}
                                  href={catUrl(item?.acf?.cateogary, language)}
                                  onClick={(e) =>
                                    setThemeLayout(item?.acf?.cateogary)
                                  }
                                  className={`btn btn-${item?.acf?.cateogary} btn-lg px-[40px]  border border-solid text-white rounded-full`}>
                                  {transalateText(
                                    siteTransalations?.generalTranslations
                                      ?.shop_now,
                                    language
                                  )}
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
                        classes={`image-2 max-width-[100%] block lg:absolute bottom-[0%] ${
                          language == "en" ? "right-[2%]" : "left-[2%]"
                        } hidden xl:block max-w-[250px]`}
                        imageurl={item?.acf?.banner2?.url || ""}
                        alt={item?.acf?.banner2?.alt || "Default title text"}
                        title={item?.acf?.banner2?.alt || "Default title text"}
                      />
                    </div>
                  </section>
                ) : (
                  <section
                    key={index}
                    ref={currentRef}
                    className={`section-${item?.acf?.cateogary} lg:min-h-screen  items-start grid relative overflow-hidden sm:py-[150px] pt-[50px]  xl:text-start`}
                    style={{
                      background: color_bg,
                      color: color_text,
                    }}>
                    <div className="wrpr text-center">
                      <div className="container z-[1] relative">
                        <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px] px-[20px]">
                          <div>
                            <div className="content z-20 relative">
                              <h2 className="xl:text-[5.5vw] sm:text-[60px] text-[32px] font-primary leading-[1] xl:mt-[-50px] sm:pt-[100px] pt-[50px] xl:pt-[0]">
                                <span
                                  className={`${
                                    language === "en"
                                      ? "text-[6vw] pb-[40px] xl:pb-[0]"
                                      : "text-[3vw] pb-[50px]"
                                  } font-secondary leading-[1.4] xl:ml-[5%] block`}>
                                  {transalateText(
                                    siteTransalations?.catTranslations?.[
                                      item?.acf?.cateogary
                                    ],
                                    language
                                  )}
                                </span>
                                <span className="mt-[-50px] block">
                                  {item?.title.rendered}
                                </span>
                              </h2>
                            </div>
                            <Images
                              width={500}
                              height={500}
                              quality={100}
                              placeholder={true}
                              classes={`image-1 max-width-[400px] block mx-auto bottom-[5%] right-0 left-0 z-[-1] hidden xl:block`}
                              imageurl={item?.acf?.banner1?.url || ""}
                              alt={
                                item?.acf?.banner1?.alt || "Default title text"
                              }
                              title={
                                item?.acf?.banner1?.alt || "Default title text"
                              }
                            />
                            <div className="content2">
                              <div className="grid gap-[30px] xl:mt-[50px] mt-[30px]">
                                <div className="xl:[&>*]:text-[20px] sm:text-[20px] text-[15px] xl:w-[85%] tracking-[3%] sm:leading-[1.6] leading-[1.7] uppercase mx-auto">
                                  <p>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: item?.content?.rendered,
                                      }}
                                    />
                                  </p>
                                </div>
                                <div>
                                  <Link
                                    aria-label={
                                      item?.acf?.main_cat[0]?.post_title
                                    }
                                    title={item?.acf?.main_cat[0]?.post_title}
                                    href={catUrl(
                                      item?.acf?.cateogary,
                                      language
                                    )}
                                    onClick={(e) =>
                                      setThemeLayout(item?.acf?.cateogary)
                                    }
                                    className={`btn btn-${item?.acf?.cateogary} btn-lg px-[40px]  border border-solid text-white rounded-full`}>
                                    {transalateText(
                                      siteTransalations?.generalTranslations
                                        ?.shop_now,
                                      language
                                    )}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Images
                        width={300}
                        height={300}
                        quality={100}
                        placeholder={false}
                        imageurl={`/images/${item?.acf?.cateogary}-hero.webp`}
                        classes={"mx-auto w-full block xl:hidden"}
                        alt={item?.acf?.banner1?.alt || "Default title text"}
                        title={item?.acf?.banner1?.alt || "Default title text"}
                      />
                    </div>
                  </section>
                )}
              </>
            );
          })}

          {featuredProducts.length !== 0 && windowWidth > 999 ? (
            <section>
              <div className="container">
                <div className="mx-auto 2xl:w-[70%] xl:w-[90%]  gap-[20px] md:py-[60px] py-[50px]">
                  <h2 className="text-[16px] uppercase font-semibold mb-[30px]">
                    {transalateText(
                      siteTransalations?.generalTranslations?.featured_products,
                      language
                    )}
                  </h2>
                  <div className="slider-container slider-featured-items mt-[30px]">
                    {featuredProducts && (
                      <AliceCarousel
                        mouseTracking
                        items={items}
                        disableDotsControls
                        disableButtonsControls
                        responsive={responsive}
                        controlsStrategy="alternate"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
          <section>
            <div className="container">
              <div
                className={`mx-auto 2xl:w-[70%] xl:w-[90%] grid sm:gap-[20px] gap-[16px] md:py-[60px] py-[30px] justify-end ${
                  featuredProducts.length !== 0 && windowWidth > 999
                    ? "border-t border-solid border-black "
                    : null
                }`}>
                <div className="md:pl-[15%]">
                  <h3 className="md:text-[30px] sm:text-[26px] text-[22px] uppercase font-medium">
                    {pageData && pageData[0]?.acf?.main_heading}
                  </h3>
                </div>
                <div className="grid gap-[8px] sm:gap-[4px] md:pl-[40%]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageData && pageData[0]?.content?.rendered,
                    }}
                  />
                  <Link
                    href={`/about/${language}`}
                    aria-label="About"
                    title="About"
                    className={`${
                      language === "en"
                        ? "text-[50px]"
                        : "text-[20px] mt-[20px]"
                    } font-secondary`}>
                    {" "}
                    {transalateText(
                      siteTransalations?.generalTranslations?.read_full,
                      language
                    )}
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

export async function getServerSideProps(context) {
  const { params } = context;
  const lang = params.lang; // Get the language from the URL
  const slug = `home-${lang}`;

  try {
    const homeRes = await axios.get(`${frontendUrl}/api/home`, {
      params: { slug },
    });

    const homeSectionsRes = await axios.get(`${frontendUrl}/api/homeSections`);
    const featuredProductsRes = await axios.get(`${frontendUrl}/api/products`);

    return {
      props: {
        pageData: homeRes.data,
        homeSections: homeSectionsRes.data,
        featuredProducts: featuredProductsRes.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        pageData: [],
        homeSections: [],
        featuredProducts: [],
      },
    };
  }
}

export async function getServerSidePaths() {
  const paths = [
    { params: { lang: "en" } },
    { params: { lang: "es" } },
    // Add more languages as needed
  ];

  return {
    paths,
    fallback: "blocking",
  };
}

// export async function getStaticPaths() {
//   const paths = [
//     { params: { lang: 'en' } },
//     { params: { lang: 'es' } },
//     // Add more languages as needed
//   ];

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }
// export async function getStaticProps(context) {
//   const { params } = context;
//   const lang = params.lang; // Change 'slug' to 'lang'
//   const slug = `home-${lang}`;

//   try {
//     const homeRes = await axios.get(`${frontendUrl}/api/home`, {
//       params: { slug },
//     });

//     const homeSectionsRes = await axios.get(`${frontendUrl}/api/homeSections`);
//     const featuredProductsRes = await axios.get(`${frontendUrl}/api/products`);

//     return {
//       props: {
//         pageData: homeRes.data,
//         homeSections: homeSectionsRes.data,
//         featuredProducts: featuredProductsRes.data,

//       },
//       revalidate: 60,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return {
//       props: {
//         pageData: [],
//         homeSections: [],
//         featuredProducts: [],
//       },
//       revalidate: 60,
//     };
//   }
// }
