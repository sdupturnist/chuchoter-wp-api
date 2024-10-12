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
  
      return newLanguage;
    });
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
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
