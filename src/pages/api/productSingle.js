import axios from 'axios';
import { wordpressRestApiUrlWoocommerce, woocommerceConsumerKey, woocommerceConsumerSecret } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: wordpressRestApiUrlWoocommerce,
  auth: {
    username: woocommerceConsumerKey,
    password: woocommerceConsumerSecret,
  },
});

// Handler function
export default async function handler(req, res) {
 
  const { slug } = req.query; // Get the slug from the query parameters

  try {
    // Fetch products filtered by slug
    const response = await WooCommerce.get('products', {
      params: {
        slug, // Filter products by the slug
      },
    });

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
