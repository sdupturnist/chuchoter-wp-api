export const wordpressGraphQlApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const wordpressRestApiUrl = process.env.NEXT_PUBLIC_API_REST_WP_URL;
export const wordpressRestApiUrlWoocommerce =
  process.env.NEXT_PUBLIC_API_REST_WP_WOOCOMMERCE_URL;
export const wordpressRestApiUrlWoocommerceCustom =
  process.env.NEXT_PUBLIC_API_REST_WP_WOOCOMMERCE_PRODUCTS_CUSTOM_URL;

export const wordpressRestApiUrlWoocommerceProductsSubCatCustom =
  process.env.NEXT_PUBLIC_API_REST_WP_WOOCOMMERCE_PRODUCTS_SUBCAT_CUSTOM_URL;


  export const wordpressRestApiUrlWoocommerceProductsTotalCount =
  process.env.NEXT_PUBLIC_API_REST_WP_WOOCOMMERCE_PRODUCTS_TOTAL_COUNT_CUSTOM_URL;

  
  export const wordpressRestApiUrlWoocommerceProductsSingle =
  process.env.NEXT_PUBLIC_API_REST_WP_WOOCOMMERCE_PRODUCT_SINGLE_CUSTOM_URL;

  export const wordpressRestApiUrlWoocommerceProductsReviewCountUpdate =
  process.env.NEXT_PUBLIC_API_REST_WP_WORDPRESS_UPDATE_REVIEW_COUNT;

export const wordpressRestApiUrlWordpressMenus =
  process.env.NEXT_PUBLIC_API_REST_WP_WORDPRESS_MENUS;
export const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
export let frontendUrl = process.env.NEXT_PUBLIC_SITE_URL;
export let sitemapPerPage = process.env.NEXT_PUBLIC_ITEM_PER_SITEMAP || 500; //1000
export let siteEmail = process.env.NEXT_PUBLIC_SITE_EMAIL;
export let siteFromEmail = process.env.NEXT_PUBLIC_SITE_FROM_EMAIL;
export let deliveryFee = process.env.NEXT_PUBLIC_DELIVERY_FEE;
export let emailUsername = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
export let emailPassword = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
export let woocommerceConsumerKey =
  process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
export let woocommerceConsumerSecret =
  process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;

export const catUrl = (mainCat, lang) => {
  return `/${
    mainCat &&
    mainCat
      ?.replace(/ /g, "-")
      .toLowerCase()
  }`;
};

export const catUrlWithSubCat = (mainCat, subCat, lang) => {
  return `/${mainCat?.replace(/ /g, "-")
    .toLowerCase()}/?sub_category=${subCat ?.replace(/ /g, "-")
      .toLowerCase()}`;
};

//https://chuchoterqatar.com/chocolates/luxury-chocolate-gift-tray-acrylic-vox-small/en/

export const itemUrl = (mainCat, url) => {
  return `/${mainCat.toString().replace(/ /g, "-").toLowerCase()}/${url
    .toLowerCase()
    .replace(/ /g, "-")}`;
};

export const paginationUrl = (mainCat, subCat, page) => {
  return `/${mainCat
    .replace(/-/g, "-")
    .toLowerCase()}?page=${page}&sub_category=${subCat || ''}`;
};


// export const paginationUrl = (mainCat, subCat, page, lang) => {
//   return `/${mainCat
//     .replace(/-/g, "-")
//     .toLowerCase()}/${lang}?page=${page}&categories=${mainCat}`;
// };

export const colorTheme = (theme) => {
  let color;
  switch (theme) {
    case "white":
      color = "white";
      break;
    case "chocolates":
      color = "#c89a3f";
      break;
    case "flowers":
      color = "#E62263";
      break;
    case "cakes":
      color = "#E79F02";
      break;
    case "events":
      color = "#258F89";
      break;
    default:
      color = "#c89a3f";
      break;
  }
  return color; // Return the color value
};

export const titleLanguages = (title, catTranslations, language) => {
  let titleLanguage;
  switch (title) {
    case "chocolates":
      titleLanguage = catTranslations.chocolates[language];
      break;
    case "flowers":
      titleLanguage = catTranslations.flowers[language];
      break;
      break;
    case "cakes":
      titleLanguage = catTranslations.cakes[language];
      break;
      break;
    case "events":
      titleLanguage = catTranslations.events[language];
      break;
  }

  return titleLanguage;
};

export const transalateText = (item, language) => {
  const text = item?.[language];
  return text;
};


export const languageText = (en, ar, language, separation) => {
  let text = '';

  if (language === 'en') {
    text = `${en}${separation === 'yes' ? ', ' : ''}`;
  } else if (language === 'ar' && ar !== '') {
    text = `${ar}${separation === 'yes' ? ', ' : ''}`;
  } else {
    text = en;  // Default to English if no valid condition is met
  }

  // Remove the last comma if there was one
  if (separation === 'yes' && text.endsWith(', ')) {
    text = text.slice(0, -2);  // Remove the last 2 characters (comma and space)
  }

  return text.replace(/,([^ ])/g, ', $1');
};







export const autoCloseDropDown = () => {
  const elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
}


export const formatDate = (dateString) => {
  
  const options = {
    year: 'numeric',
    month: 'long', // 'short' for abbreviated month
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use true for 12-hour format
  };

  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
}