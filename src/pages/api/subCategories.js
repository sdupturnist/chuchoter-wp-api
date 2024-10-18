import axios from "axios";
import { wordpressRestApiUrlWoocommerceProductsSubCatCustom } from "@/utils/variables";

const WooCommerce = axios.create({
  baseURL: `${wordpressRestApiUrlWoocommerceProductsSubCatCustom}`,
});

// Handler function
export default async function handler(req, res) {
  const { per_page, main_categories } = req.query; // Default to page 1 and 100 items per page

  try {
    // Fetch products
    const response = await WooCommerce.get("products", {
      params: {
        per_page:1000,
        main_categories: main_categories,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        error: "Failed to fetch products",
        details: error.response ? error.response.data : error.message,
      });
  }
}
// products?reviews_count=1
