import axios from 'axios';
import { wordpressRestApiUrlWoocommerce, wordpressRestApiUrlWoocommerceCustom, woocommerceConsumerKey, woocommerceConsumerSecret } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerceCustom}`,
});

// Handler function
export default async function handler(req, res) {
  const { 
    page,
    per_page ,
    min_price  ,
      reviews_count,
      main_categories,
      sub_categories,
      search,
      language
    } = req.query; // Default to page 1 and 100 items per page

    
  try {
    // Fetch products
    const response = await WooCommerce.get('products', {
      params: {
        reviews_count,
       // consumer_key: woocommerceConsumerKey,
       // consumer_secret: woocommerceConsumerSecret,
   min_price,
      per_page,
      page,
      main_categories,
      sub_categories,
      search,
      language
      },
    });

  

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.response ? error.response.data : error.message });
  }
}
// products?reviews_count=1