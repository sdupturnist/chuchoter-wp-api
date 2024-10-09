import axios from 'axios';
import { wordpressRestApiUrlWoocommerce, woocommerceConsumerKey, woocommerceConsumerSecret } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerce}`,
});

// Handler function for total product count
export default async function handler(req, res) {
  try {
    const response = await WooCommerce.get('products', {
      params: {
        consumer_key: woocommerceConsumerKey,
        consumer_secret: woocommerceConsumerSecret,
        per_page: 1, // Limiting to 1 item to get the total count
        page: 1, // Fetch from the first page
      },
    });

    // The total count can be found in the headers if using WooCommerce API
    const totalCount = response.headers['x-wp-total'];

    res.status(200).json({ totalCount: Number(totalCount) }); // Return the total count as a number
  } catch (error) {
    console.error('Error fetching total product count:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch total product count', details: error.response ? error.response.data : error.message });
  }
}
