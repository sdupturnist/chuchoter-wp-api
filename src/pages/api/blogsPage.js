import axios from 'axios';
import { wordpressRestApiUrl } from "@/utils/variables";

const Wordpress = axios.create({
  baseURL: wordpressRestApiUrl,
});

// Handler function
export default async function handler(req, res) {
  try {
    // Fetch product reviews
    const response = await Wordpress.get('pages/392');

    // Return only the data portion of the response
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products', 
      details: error.response ? error.response.data : error.message 
    });
  }
}
