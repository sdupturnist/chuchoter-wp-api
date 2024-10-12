import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage ? savedLanguage : 'en';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === 'en' ? 'ar' : 'en';
      // Update the URL parameter
      const params = new URLSearchParams(window.location.search);
      if (newLanguage === 'ar') {
        params.set('lang', 'ar');
      } else {
        params.delete('lang');
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
      return newLanguage;
    });
  };

  const updateUrlWithLanguage = (href) => {
    const params = new URLSearchParams(window.location.search);
    if (language === 'ar') {
      params.set('lang', 'ar');
    } else {
      params.delete('lang');
    }
    const url = new URL(href, window.location.origin);
    url.search = params.toString();
    return url.toString();
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, updateUrlWithLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
