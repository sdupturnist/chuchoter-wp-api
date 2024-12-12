


export const wordpressGraphQlApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const wordpressRestApiUrl = `https://admin.chuchoterqatar.com/wp-json/wp/v2/`;
export const wordpressRestApiUrlWoocommerce = `https://admin.chuchoterqatar.com/wp-json/wc/v3/`
export const wordpressRestApiUrlWoocommerceCustom = `https://admin.chuchoterqatar.com/wp-json/wc-custom/v1/`

export const wordpressRestApiUrlWoocommerceProductsSubCatCustom = `https://admin.chuchoterqatar.com/wp-json/subcat/v1/`

export const wordpressRestApiUrlWoocommerceProductsTotalCount = `https://admin.chuchoterqatar.com/wp-json/wc-custom/v1/`

export const wordpressRestApiUrlWoocommerceProductsSingle = `https://admin.chuchoterqatar.com/wp-json/wc-single/v1/`

export const wordpressRestApiUrlWoocommerceProductsReviewCountUpdate = `https://admin.chuchoterqatar.com/wp-json/wc-custom/v1/products/reviews-count/`

export const wordpressRestApiUrlWordpressMenus = `https://admin.chuchoterqatar.com/wp-json/sitemenu/v1/`
export const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
export let frontendUrl = process.env.NEXT_PUBLIC_SITE_URL;
export let sitemapPerPage = 500; //1000
export let siteEmail = 'mohammedrabeeh@gmail.com';
export let siteFromEmail = `noreply@chuchoter.com`;
export let deliveryFee = 10;
export let emailUsername = `jaseerali2012@gmail.com`;
export let emailPassword = `avjbzfvwygdyretn`;
export let woocommerceConsumerKey = `ck_270d3c9d3dbee272a02db0d14c1cfc902c0d752d`
export let woocommerceConsumerSecret = `cs_9dde39d4ec0a12ad1e4fcbcfb5cb6abb428dee79`

export const catUrl = (mainCat, lang) => {
  return `/${mainCat && mainCat?.replace(/ /g, "-").toLowerCase()}`;
};

export const catUrlWithSubCat = (mainCat, subCat, lang) => {
  return `/${mainCat?.replace(/ /g, "-").toLowerCase()}/?sub_category=${subCat
    ?.replace(/ /g, "-")
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
    .toLowerCase()}?page=${page}&sub_category=${subCat || ""}`;
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
  let text = "";

  if (language === "en") {
    text = `${en}${separation === "yes" ? ", " : ""}`;
  } else if (language === "ar" && ar !== "") {
    text = `${ar}${separation === "yes" ? ", " : ""}`;
  } else {
    text = en; // Default to English if no valid condition is met
  }

  // Remove the last comma if there was one
  if (separation === "yes" && text.endsWith(", ")) {
    text = text.slice(0, -2); // Remove the last 2 characters (comma and space)
  }

  return text.replace(/,([^ ])/g, ", $1");
};

export const autoCloseDropDown = () => {
  const elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
};

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long", // 'short' for abbreviated month
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use true for 12-hour format
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
