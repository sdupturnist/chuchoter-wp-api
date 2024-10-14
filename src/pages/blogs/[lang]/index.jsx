import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Card from "@/components/Cards";
import NoData from "@/components/Nodata";
import axios from "axios";


export default function Blogs({ pageData, blogData }) {




  return (
    <>
       <Metatags seo={pageData && pageData?.yoast_head_json} />
      <Layout
        page="blog"
      >
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%]">
          <PageHeader title={pageData?.title?.rendered} />
            <div className="sm:pb-[50px] pb-[30px] justify-between lg:gap-[100px] gap-[50px]">
              {!blogData.length == 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-[50px] gap-[30px]" >
                    {blogData && blogData.map((item, key) => {
                      return (
                        <div className="w-full grid gap-[20px]" key={key}>
                          <Card
                            type="blog"
                            item={item}

                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-center">
                    {/* <Pagination */}
                      {/* currentPage={pagination.page} */}
                      {/* pageCount={pagination.pageCount} */}
                    {/* /> */}
                  </div>
                </>
              ) : (
                <NoData title="Sorry, no blog posts available." />
              )}


            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getStaticPaths() {
  // Define the paths that should be pre-rendered at build time
  const paths = [
    { params: { slug: 'en' } }, // Add other languages as needed
    { params: { slug: 'es' } },
    // ...more paths
  ];

  return {
    paths,
    fallback: 'blocking', // Use blocking fallback for SSR if not found
  };
}




export async function getStaticProps() {
  try {
  
    const blogsPageRes = await axios.get(`${frontendUrl}/api/blogsPage`);

    const blogsRes = await axios.get(`${frontendUrl}/api/blogs`);


    return {
      props: {
        pageData: blogsPageRes.data,
        blogData:blogsRes.data
      },
      revalidate: 60, // revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        pageData: [],
        blogData:[]
      },
      revalidate: 60, // still revalidate even on error
    };
  }
}

