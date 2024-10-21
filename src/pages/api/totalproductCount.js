import axios from 'axios';
import { wordpressRestApiUrlWoocommerceProductsTotalCount } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerceProductsTotalCount}`,
});

// Handler function
export default async function handler(req, res) {
  const { categories } = req.query;

  // Log received category value
  //console.log('Received category-----------------------------------------------:', categories);

  try {
    // Fetch products count
    const response = await WooCommerce.get('products/count', {
      params: {
        categories:  categories  // Ensure category is a valid slug or ID
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Failed to fetch products',
      details: error.response ? error.response.data : error.message,
    });
  }
}
