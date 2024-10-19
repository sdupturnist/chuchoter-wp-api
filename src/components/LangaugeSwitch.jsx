// import { useLanguageContext } from "@/context/LanguageContext";
// import { useRouter } from "next/router";

// export default function LanguageSwitch() {
//     const { language, toggleLanguage } = useLanguageContext();
//     const router = useRouter();

//     // Define labels for Arabic and English
//     const labels = {
//         en: "عربي",
//         ar: "English"
//     };

//     const handleLanguageToggle = () => {
//         const currentLanguage = localStorage.getItem('language') || 'en';
//         const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'; // Toggle language
//         localStorage.setItem('language', newLanguage); // Update localStorage

//         // Update the language context
//         toggleLanguage();

//         // Update the router query
//         router.push({
//             pathname: router.pathname,
//             query: { ...router.query, locale: newLanguage },
//         });
//     };

//     return (
//         <button 
//             onClick={handleLanguageToggle} 
//             className="uppercase font-ar"
//         >
//             {labels[language] || labels.en} {/* Default to English if language code is unknown */}
//         </button>
//     );
// }
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
    if (savedLanguage) {
      router.push(router.pathname, router.asPath, { locale: savedLanguage });
    }
  }, [router]);

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
