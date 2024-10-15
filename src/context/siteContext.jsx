// context/SiteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl } from '@/utils/variables';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [catData, setCatData] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [contactData, setContactData] = useState(null); // State for contact data
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
      setContactData(response.data); // Update state with contact data
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
    fetchDataContactInfo(); // Initial fetch for contact info
  }, []);

  return (
    <SiteContext.Provider value={{ catData, navigationData, subCategoryData, contactData, loading, error, fetchDataCat, fetchDataNavigation, fetchDataSubCategories, fetchDataContactInfo }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
