
import axios from 'axios';
import { woocommerceConsumerKey, woocommerceConsumerSecret, wordpressRestApiUrlWoocommerce } from "@/utils/variables";

const Wordpress = axios.create({
  baseURL: wordpressRestApiUrlWoocommerce,
});

// Handler function
export default async function handler(req, res) {
 
  try {
    // Fetch products filtered by slug
    const response = await Wordpress.get(`products/tags?consumer_key=${woocommerceConsumerKey}&consumer_secret=${woocommerceConsumerSecret}&per_page=100`
    );

    // Return the filtered products
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products', 
      details: error.response ? error.response.data : error.message 
    });
  }
}



