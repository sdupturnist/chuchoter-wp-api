import {frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Images from '@/components/Images';
import Metatags from "@/components/Seo";
import axios from "axios";



export default function BlogSingle({ blog }) {



  function formatBlogDate(date_) {

    const originalDate = new Date(date_);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });

    return formattedDate

  }


  return (
  
    blog &&
     <>
    <Metatags seo={blog && blog?.yoast_head_json} />
      <Layout
        page="blog-single"
      >

        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid sm:gap-[50px] gap-[30px] xl:py-[70px] lg:py-[50px] py-[30px]">


          <div className="grid sm:gap-[30px] gap-[20px]">
                <h1 className="sm:text-[36px] text-[22px] font-semibold">{blog && blog?.title?.rendered}</h1>
                <Images
                  width="1200"
                  height="600"
                  quality={100}
                  placeholder={true}
                  imageurl={blog?.fea_data && blog?.fea_data?.url}
                  classes={'mx-auto w-full block rounded-[8px] object-cover sm:min-h-[450px]'}
                  alt={blog?.fea_data && blog?.fea_data?.alt}
                  title={blog?.fea_data && blog?.fea_data?.alt}
                />
                <div className="grid gap-[15px]">
                  <div className="content grid gap-[16px]">
                    <div dangerouslySetInnerHTML={{
                      __html:
                        blog &&
                        blog?.content?.rendered
                    }} />
                  </div>
                  <p className="mt-[16px]">
                    {blog && blog.Author} 
                    {/* <span className="text-[10px] text-gray-300 px-[6px]">|</span>  */}
                    {blog && formatBlogDate(blog?.date)}</p>
                </div>
              </div>

            {/* {blogs.length !== 0 && <div className="sm:py-[50px] py-[30px] justify-between gap-[40px] border-t border-gray-200 border-solid"> */}
              {/* <div className="flex justify-between items-center"> */}
                {/* <h2 className="uppercase font-semibold text-black sm:text-[24px] text-[18px]">More blogs</h2> */}
                {/* {blogs.length > 1 && <Link href={'/blogs'} className="btn btn-outline border border-gray-300 rounded-[6px] px-[20px] hidden sm:flex">view more</Link>} */}
              {/* </div> */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-[50px] gap-[30px] mt-[30px]" > */}
                {/* {blogs && blogs.map((item, key) => { */}
                  {/* return ( */}
                    {/* <div className="w-full grid gap-[20px]" key={key}> */}
                      {/* <Card */}
                        {/* type="blog" */}
                        {/* item={item} */}
                      {/* /> */}
                    {/* </div> */}
                  {/* ) */}
                {/* })} */}
{/*  */}
              {/* </div> */}
              {/* {blogs.length > 1 && <Link href={'/blogs'} className="btn btn-outline border border-gray-300 rounded-[6px] px-[20px] flex sm:hidden mt-[30px]">view more</Link>} */}
            {/* </div>} */}
          </div>
        </div>
      </Layout>
     </>
   
  );
}



export async function getServerSideProps(context) {
  const { slug } = context.params; // Get the slug from URL parameters

  try {
    // Fetch blog data based on the slug
    const res = await axios.get(`${frontendUrl}/api/blogSingle`, {
      params: { slug },
    });

    // Check if the blog data is empty or undefined
    if (!res.data || res.data.length === 0) {
      return {
        notFound: true, // Redirect to 404 page
      };
    }

    return {
      props: {
        blog: res.data[0], // Set the fetched blog
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    return {
      notFound: true, // Redirect to 404 page in case of an error
    };
  }
}
