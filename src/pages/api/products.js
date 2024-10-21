import axios from 'axios';
import { wordpressRestApiUrlWoocommerceCustom } from "@/utils/variables";

// Create an axios instance to communicate with WooCommerce API
const WooCommerce = axios.create({
  baseURL: wordpressRestApiUrlWoocommerceCustom, // WooCommerce API base URL
});

// Handler function to fetch products
export default async function handler(req, res) {
  // Destructure query parameters with default values
  const { 
    page = 1,              // Default to page 1
    per_page = 30,         // Default to 30 items per page
    min_price,             // Minimum price filter
    reviews_count,         // Minimum reviews count
    search,                // Search query filter
    category       // Default to an empty array if no categories are provided
  } = req.query;

  try {
    // Fetch products from WooCommerce API
    const response = await WooCommerce.get('products', {
      params: {
        page, 
        per_page, 
        min_price, 
        reviews_count, 
        search, 
        category: category, // categories[] should be passed as an array
      }
    });

    // Send the fetched products as JSON
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products', 
      details: error.response ? error.response.data : error.message 
    });
  }
}
