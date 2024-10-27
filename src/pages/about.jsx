import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from "@/components/Seo";
import Images from "@/components/Images";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { AOSInit } from "@/components/Aos";
import axios from "axios";

export default function About({ pageData }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageData) {
      setIsLoading(false);
    }
  }, [pageData]);

  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout page={"about"}>
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] ">
            {isLoading ? (
              <div className="grid gap-[12px] sm:py-[100px] py-[50px]">
                <div className="skeleton h-32 w-full sm:min-h-[100px] rounded-[10px]"></div>
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <div data-aos="fade-up">
                  <PageHeader title={pageData?.title?.rendered} />
                </div>
                <div>
                  <div data-aos="fade-up" data-aos-delay="500">
                    <Images
                      width="1200"
                      height="600"
                      quality={100}
                      placeholder={true}
                      imageurl={pageData?.fea_data?.url}
                      classes={"mx-auto w-full block rounded-[10px]"}
                      alt={pageData?.fea_data?.alt}
                      title={pageData?.fea_data?.alt}
                    />
                  </div>
                  <div
                    className="grid gap-[30px] md:pt-[60px] sm:pt-[30px] pt-[20px] sm:pb-[100px] pb-[30px] justify-end [&>*]:text-justify"
                    data-aos="fade-up"
                    data-aos-delay="700">
                    <div
                      className="[&>*]:mb-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: pageData && pageData?.content?.rendered,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getStaticProps(context) {
  const { locale } = context;

  const slug = `about-${locale}`; // Constructing the slug

  try {
    // Fetch data based on the slug
    const res = await axios.get(`${frontendUrl}/api/about`, {
      params: { slug },
    });

    // Check if the data is empty or undefined
    if (!res.data || res.data.length === 0) {
      return {
        notFound: true, // Redirect to 404 page if no data found
      };
    }

    return {
      props: {
        pageData: res.data[0], // Return the first item from the response
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching about data:", error.message);
    return {
      notFound: true, // Redirect to 404 page in case of an error
    };
  }
}

// Remove getStaticPaths since this is a static route
