import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/Forms/ContactUs";
import { ContactData } from "@/hooks/contactData";
import { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { AOSInit } from "@/components/Aos";
import axios from "axios";


export default function Contact({ initialData, pageData }) {


  const { dataContact } = ContactData(initialData);

  const contactData = dataContact && dataContact[0]?.acf



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dataContact) {
      setIsLoading(false);
    }
  }, [dataContact]);

  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout page="contact">
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%]">


            {/* <PageHeader
            type="cat"
            catcount={5}
            title={query.category.replace(/-/g, ' ')}
            mainCat={query.category}
            data={allProducts}
          /> */}

            <PageHeader title={pageData && pageData.title?.rendered} />

            <div className="md:flex grid [&>*]:text-black lg:mb-[70px] sm:py-[50px] pb-[30px] justify-between lg:gap-[100px] gap-[50px]">
              <div className="grid gap-[32px] w-full" data-aos="fade-up">
                <div className="grid gap-[32px] w-full">
                  {isLoading ? (
                    <div>
                      <div className="skeleton h-4 w-[50%] rounded-[10px] mb-5"></div>
                      <div className="skeleton h-4 w-full rounded-[10px] mb-5"></div>
                      <div className="skeleton h-4 w-full rounded-[10px]"></div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                        Office
                      </h2>
                      <p className="mb-[8px]">
                        <div dangerouslySetInnerHTML={{ __html: dataContact && dataContact[0].content?.rendered }} />
                      </p>
                      <p className="mb-[8px]">
                        {dataContact && contactData?.phone}
                      </p>
                      <p>
                        {dataContact && contactData?.email}
                      </p>
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                      Business Inquiries
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: pageData && pageData.content?.rendered }} />
                  </div>
                </div>
              </div>
              <div className="w-full block" data-aos="fade-up" data-aos-delay="500">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getStaticProps() {
  try {
    const contactRes = await axios.get(`${frontendUrl}/api/contact`);


    return {
      props: {
        pageData: contactRes.data,
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

