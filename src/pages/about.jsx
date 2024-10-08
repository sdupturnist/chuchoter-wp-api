import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Images from '@/components/Images';
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { AOSInit } from '@/components/Aos';

export default function About({ pageData_ }) {
  const pageData = pageData_?.data?.pages?.nodes[0];



  console.log(pageData)


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (pageData_) {
      setIsLoading(false);
    }
  }, [pageData_]);

  return (
    <>
      <Metatags seo={pageData_?.data?.about?.data?.attributes?.seo} />
      <Layout page={'about'}>
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] ">
            {isLoading ? (
              <div className='grid gap-[12px] sm:py-[100px] py-[50px]'>
                <div className="skeleton h-32 w-full sm:min-h-[100px] rounded-[10px]"></div>
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <div data-aos="fade-up">
                  <PageHeader title={pageData?.title} />
                </div>
                <div>
                  <div data-aos="fade-up" data-aos-delay="500">
                    <Images
                      width="1200"
                      height="600"
                      quality={100}
                      placeholder={true}
                      imageurl={pageData?.featuredImage?.node?.sourceUrl}
                      classes={'mx-auto w-full block rounded-[10px]'}
                      alt={pageData?.featuredImage?.node?.altText}
                      title={pageData?.featuredImage?.node?.altText}

                    />
                  </div>
                  <div className="grid gap-[30px] md:pt-[60px] sm:pt-[30px] pt-[20px] sm:pb-[100px] pb-[30px] justify-end [&>*]:text-justify" data-aos="fade-up" data-aos-delay="700">
                    <div className="[&>*]:mb-[20px]" dangerouslySetInnerHTML={{ __html: pageData && pageData?.content }} />
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

export async function getStaticProps() {
  try {
    const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Pages {
  pages(where: {id: 25}) {
    nodes {
      title
      content
      featuredImage{
        node{
          altText
          sourceUrl
        }
      }
      seo {
        canonical
        focuskw
        opengraphSiteName
        metaDesc
        metaKeywords
        title
        opengraphDescription
        opengraphSiteName
        opengraphUrl
        opengraphImage {
          altText
          link
          sourceUrl
        }
        opengraphType
        opengraphTitle
        opengraphModifiedTime
        twitterDescription
        twitterTitle
        twitterImage {
          sourceUrl
        }
      }
    }
  }
}`,
      }),
    });

    const pageData_ = await pageDataResponse.json();

    return {
      props: {
        pageData_,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
      },
      revalidate: 60, // Optional: allow revalidation even on error
    };
  }
}
