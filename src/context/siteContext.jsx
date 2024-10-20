// context/SiteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl, wordpressRestApiUrlWoocommerceProductsSubCatCustom } from '@/utils/variables';
import { useRouter } from 'next/router';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [catData, setCatData] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null); 
  const [headerMenus, setHeaderMenus] = useState(null); 
  const [sitemapMenus, setSitemapMenus] = useState(null); 
  const [siteTransalations, setSiteTransalations] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const router = useRouter();
  const { query } = router;



  // Fetch categories data
  const fetchDataCat = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${frontendUrl}/api/mainCategories`);
      setCatData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch navigation data
  const fetchDataNavigation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${frontendUrl}/api/navigations`);
      setNavigationData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories data
  const fetchDataSubCategories = async () => {
    setLoading(true);

    const {  category} = query;

    const responseData = `${wordpressRestApiUrlWoocommerceProductsSubCatCustom}products?per_page=1000&categories=${category}`;

    try {
     // const response = await axios.get(`${frontendUrl}/api/subCategories`);


     const response = await axios.get(responseData);
    


    // const maincat = query.categories;


    //   const response = await axios.get(`${frontendUrl}/api/subCategories`, {
    //     params: {
    //       per_page: 2000,
    //       categories: maincat,
    //     },
    //   });

      setSubCategoryData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (query.category) {
      fetchDataSubCategories();
    }
  }, [query.category]); // Re-fetch when main_categories changes

  

  // Fetch contact data
  const fetchDataContactInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${frontendUrl}/api/contactInfo`);
      setContactData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch additional menus data
  const fetchDataAdditionalMenus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${frontendUrl}/api/menu`);
      
      // Update state with both header and footer menus
      setFooterMenus(response.data.footerMenu);
      setHeaderMenus(response.data.headerMenu); 
      setSitemapMenus(response.data.footerSitemapMenu); 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };



   // Fetch additional menus data
   const fetchDataTransalation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${frontendUrl}/api/transalations`);
      setSiteTransalations(JSON.parse(response.data[0]?.acf?.transalations));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchDataCat();
    fetchDataNavigation();
    fetchDataSubCategories();
    fetchDataContactInfo();
    fetchDataAdditionalMenus(); 
    fetchDataTransalation()
  }, []);

  return (
    <SiteContext.Provider value={{ 
      catData, 
      navigationData, 
      subCategoryData, 
      contactData, 
      headerMenus,
      footerMenus, 
      sitemapMenus,
      siteTransalations,
      loading, 
      error, 
      fetchDataCat, 
      fetchDataNavigation, 
      fetchDataSubCategories, 
      fetchDataContactInfo, 
      fetchDataAdditionalMenus // Expose additional fetch function
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
