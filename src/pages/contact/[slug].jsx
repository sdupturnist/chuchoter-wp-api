import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/Forms/ContactUs";
import { ContactData } from "@/hooks/contactData";
import { useEffect, useState } from "react";
import { AOSInit } from "@/components/Aos";
import axios from "axios";
import { Link } from "react-alice-carousel";


export default function Contact({ initialData, pageData }) {



  const { dataContact } = ContactData(initialData);



  const [isLoading, setIsLoading] = useState(true);
  const [contactData, setContactData] = useState('');

  useEffect(() => {
    setContactData(dataContact && dataContact[0])

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


            <PageHeader title={pageData && pageData?.acf?.page_title} />

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

                        {pageData && pageData?.acf?.contact_heading}

                      </h2>
                      <p className="mb-[8px]">
                        <div dangerouslySetInnerHTML={{ __html: dataContact && dataContact[0].content?.rendered }} />
                      </p>
                      <Link
                      href={`tel:${dataContact && dataContact[0].acf?.phone}`}
                      className="mb-[8px] block pb-[5px]">
                      {dataContact && dataContact[0].acf?.phone}
                    </Link>
                    <Link
                      href={`mailto:${
                        dataContact && dataContact[0].acf?.email
                      }`}
                      className="mb-[8px] block">
                      {dataContact && dataContact[0].acf?.email}
                    </Link>
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                      {pageData && pageData?.acf?.enquiry_heading}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: pageData && pageData.content?.rendered }} />
                  </div>
                </div>
              </div>
              <div className="w-full block" data-aos="fade-up" data-aos-delay="500">
                <ContactForm
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}




export async function getServerSideProps(context) {
  const { params } = context;

  // Extract the language from the params
  const lang = params.slug; // Assuming you have a dynamic route like /contact/[slug]
  const slug = `contact-${lang}`; // Constructing the slug

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
    console.error('Error fetching contact data:', error.message);
    return {
      notFound: true, // Redirect to 404 page in case of an error
    };
  }
}

// No need for getStaticPaths in SSR



// export async function getStaticProps(context) {
//   const { params } = context;

//   // Extract the language from the params
//   const lang = params.slug; // Assuming you have a dynamic route like /about/[slug]
//   const slug = `contact-${lang}`; // Constructing the slug

//   try {
//     // Fetch data based on the slug
//     const res = await axios.get(`${frontendUrl}/api/contact`, {
//       params: { slug },
//     });

//     // Check if the data is empty or undefined
//     if (!res.data || res.data.length === 0) {
//       return {
//         notFound: true, // Redirect to 404 page if no data found
//       };
//     }

//     return {
//       props: {
//         pageData: res.data[0], // Return the first item from the response
//       },
//       revalidate: 60, // Regenerate the page every 60 seconds
//     };
//   } catch (error) {
//     console.error('Error fetching about data:', error.message);
//     return {
//       notFound: true, // Redirect to 404 page in case of an error
//     };
//   }
// }

// export async function getStaticPaths() {
//   // Define the paths that should be pre-rendered at build time
//   const paths = [
//     { params: { slug: 'en' } }, // Add other languages as needed
//     { params: { slug: 'es' } },
//     // ...more paths
//   ];

//   return {
//     paths,
//     fallback: 'blocking', // Use blocking fallback for SSR if not found
//   };
// }

