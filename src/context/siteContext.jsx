// context/SiteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl } from '@/utils/variables';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [catData, setCatData] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null); 
  const [headerMenus, setHeaderMenus] = useState(null); 
  const [sitemapMenus, setSitemapMenus] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    try {
      const response = await axios.get(`${frontendUrl}/api/subCategories`);
      setSubCategoryData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
  

  useEffect(() => {
    fetchDataCat();
    fetchDataNavigation();
    fetchDataSubCategories();
    fetchDataContactInfo();
    fetchDataAdditionalMenus(); // Fetch additional menus data
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
