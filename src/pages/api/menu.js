import axios from 'axios';
import { wordpressRestApiUrlWordpressMenus } from "@/utils/variables";

const Wordpress = axios.create({
  baseURL: wordpressRestApiUrlWordpressMenus,
});

// Handler function
export default async function handler(req, res) {
 // const { slug } = req.query; // Get the slug from the query parameters

  try {
    // Fetch menus for header and footer
    const [footerResponse, headerResponse, footerSitemapResponse, headerCatMenu] = await Promise.all([
      Wordpress.get('menus/footer-menu'),
      Wordpress.get('menus/header-menu'),
      Wordpress.get('menus/footer-sitemap'),
      Wordpress.get('menus/header-cat-menu'),
    ]);

    // Return both menu data
    res.status(200).json({
      footerMenu: footerResponse.data,
      headerMenu: headerResponse.data,
      footerSitemapMenu: footerSitemapResponse.data,
      headerCatMenu: headerCatMenu.data,
    });
  } catch (error) {
    console.error('Error fetching menus:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch menus', 
      details: error.response ? error.response.data : error.message 
    });
  }
}
