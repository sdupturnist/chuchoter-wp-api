import axios from 'axios';
import { wordpressRestApiUrlWoocommerceProductsTotalCount } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerceProductsTotalCount}`,
});

// Handler function
export default async function handler(req, res) {
 
    
  try {
    // Fetch products
    const response = await WooCommerce.get('products/count');


    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.response ? error.response.data : error.message });
  }
}
// products?reviews_count=1