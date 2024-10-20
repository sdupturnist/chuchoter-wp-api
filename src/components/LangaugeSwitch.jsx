import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguageContext } from "@/context/LanguageContext";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;
  const { toggleLanguage } = useLanguageContext();

  // Load the language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== locale) {
      router.replace(router.pathname, router.asPath, { locale: savedLanguage });
    }
  }, [locale, router]);

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
    localStorage.setItem('language', lang); // Store the selected language
  };

  // Toggle between languages
  const handleToggle = () => {
    const newLang = locale === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
    toggleLanguage(); // Call toggleLanguage after changing the language
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {locale === 'en' ? 'العربية' : 'English'}
      </button>
      <p>Current Language: {locale}</p>
    </div>
  );
};

export default LanguageSwitcher;
