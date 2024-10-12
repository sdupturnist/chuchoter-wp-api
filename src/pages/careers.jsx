import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { AOSInit } from "@/components/Aos";
import axios from "axios";

export default function Career({ pageData }) {


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageData) {
      setIsLoading(false);
    }
  }, [pageData]);

  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout page={'about'}>
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[60%]">
            {isLoading ? (
              <div className='grid gap-[12px] sm:py-[100px] py-[50px]'>
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <div data-aos="fade-up">
                  <PageHeader title={pageData?.title?.rendered} />
                </div>
                <div data-aos="fade-up" data-aos-delay="500" className="grid gap-[30px] sm:pb-[100px] pb-[30px] text-center">
                  <div className="content-general" dangerouslySetInnerHTML={{ __html: pageData?.content?.rendered }} />
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
    const careersRes = await axios.get(`${frontendUrl}/api/careers`);


    return {
      props: {
        pageData: careersRes.data,
      },
      revalidate: 60, // revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        pageData: [],
      },
      revalidate: 60, // still revalidate even on error
    };
  }
}
