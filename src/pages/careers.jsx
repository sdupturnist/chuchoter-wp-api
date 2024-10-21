import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from "@/components/Seo";
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
      <Layout page={"about"}>
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[60%]">
            {isLoading ? (
              <div className="grid gap-[12px] sm:py-[100px] py-[50px]">
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <div data-aos="fade-up">
                  <PageHeader title={pageData?.title?.rendered} />
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="grid gap-[30px] sm:pb-[100px] pb-[30px] text-center">
                  <div
                    className="content-general"
                    dangerouslySetInnerHTML={{
                      __html: pageData?.content?.rendered,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale, params } = context;

  const slug = `careers-${locale}`; // Constructing the slug

  try {
    // Fetch data based on the slug
    const res = await axios.get(`${frontendUrl}/api/careers`, {
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
    };
  } catch (error) {
    console.error("Error fetching about data:", error.message);
    return {
      notFound: true, // Redirect to 404 page in case of an error
    };
  }
}
