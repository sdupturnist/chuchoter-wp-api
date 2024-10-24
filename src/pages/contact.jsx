import { frontendUrl, languageText } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/Forms/ContactUs";
import { useEffect, useState } from "react";
import { AOSInit } from "@/components/Aos";
import axios from "axios";
import { Link } from "react-alice-carousel";
import { useSiteContext } from "@/context/siteContext";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Contact({ initialData, pageData }) {
  const { contactData } = useSiteContext();
  const { language } = useLanguageContext();

  return (
    <>
      <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout page="contact">
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%]">
            <PageHeader title={pageData && pageData?.acf?.page_title} />

            <div className="md:flex grid [&>*]:text-black lg:mb-[70px] sm:py-[50px] pb-[30px] justify-between lg:gap-[100px] gap-[50px]">
              <div className="grid gap-[32px] w-full" data-aos="fade-up">
                <div className="grid gap-[32px] w-full">
                  <div>
                    <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                      {pageData && pageData?.acf?.contact_heading}
                    </h2>
                    <p className="mb-[8px]">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: languageText(
                            contactData && contactData[0].content?.rendered,
                            contactData && contactData[1].content?.rendered,
                            language,
                            "no"
                          ),
                        }}
                      />
                    </p>
                    <Link
                      href={`tel:${contactData && contactData[0].acf?.phone}`}
                      className="mb-[8px] block pb-[5px]">
                      {languageText(
                        contactData && contactData[0].acf?.phone,
                        contactData && contactData[1].acf?.phone,
                        language,
                        "no"
                      )}
                    </Link>
                    <Link
                      href={`mailto:${
                        contactData && contactData[0].acf?.email
                      }`}
                      className="mb-[8px] block">
                      {languageText(
                        contactData && contactData[0].acf?.email,
                        contactData && contactData[1].acf?.email,
                        language,
                        "no"
                      )}
                    </Link>
                  </div>

                  <div>
                    <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                      {pageData && pageData?.acf?.enquiry_heading}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pageData && pageData.content?.rendered,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="w-full block"
                data-aos="fade-up"
                data-aos-delay="500">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale, params } = context;

  const slug = `contact-${locale}`; // Constructing the slug

  try {
    // Fetch data based on the slug
    const res = await axios.get(`${frontendUrl}/api/contact`, {
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
