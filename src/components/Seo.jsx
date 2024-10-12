import Head from "next/head";
import { adminUrl, frontendUrl } from "@/utils/variables";
import { useRouter } from 'next/router';

export default function Metatags({ seo }) {




    const router = useRouter();

    const currentPath = router.asPath;



    


    return (
        <>
            <Head>
                <>

                    <title>{seo?.title && seo?.title}</title>


                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />




                    <meta name="description" content={seo?.description && seo?.description} />
                    {/* <meta name="keywords" content={seo && seo?.keywords} /> */}
                    <link rel="canonical" href={(frontendUrl + currentPath + '/').replace(/([^:]\/)\/+/g, "$1")} />
                    <meta name="robots" content="index, follow" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={seo?.og_title && seo?.og_title} />
                    <meta property="og:description" content={seo?.og_description && seo?.og_description} />
                    <meta property="og:url" content={(frontendUrl + currentPath + '/').replace(/([^:]\/)\/+/g, "$1")} />
                    <meta property="og:site_name" content={seo?.og_site_name && seo?.og_site_name} />
                    <meta property="article:modified_time" content={seo?.article_modified_time && seo?.article_modified_time} />
                    <meta property="og:image" content={seo?.og_image ? (adminUrl) + seo?.og_image[0]?.url : ''} />
                    <meta property="og:image:width" content={seo?.og_image ? seo?.og_image[0]?.width : ''} /> 
                    <meta property="og:image:height" content={seo?.og_image ? seo?.og_image[0]?.height : ''} /> 
                    <meta property="og:image:type" content={seo?.og_image ? seo?.og_image[0]?.type : ''} /> 
                    <meta name="twitter:card" content={seo?.twitter_card ? seo?.twitter_card : ''} /> 
                </>
            </Head>
        </>
    )
}