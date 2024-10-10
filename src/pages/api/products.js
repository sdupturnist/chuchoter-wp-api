import axios from 'axios';
import { wordpressRestApiUrlWoocommerce, woocommerceConsumerKey, woocommerceConsumerSecret } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerce}`,
});

// Handler function
export default async function handler(req, res) {
  const { page = 1, per_page = 100, min_price = 0, user_reviews = 0 } = req.query; // Default to page 1 and 100 items per page

  try {
    // Fetch products
    const response = await WooCommerce.get('products', {
      params: {
        consumer_key: woocommerceConsumerKey,
        consumer_secret: woocommerceConsumerSecret,
        user_reviews,
        min_price,
        per_page,
        page,
      },
    });

    // Filter products by rating
    const filteredProducts = response.data.filter(product => product.rating_count >= rating_count);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.response ? error.response.data : error.message });
  }
}
