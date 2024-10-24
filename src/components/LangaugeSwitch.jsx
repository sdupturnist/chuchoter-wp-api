import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/LanguageContext";

const LanguageSwitcher = (color) => {
  const router = useRouter();
  const { locale } = router;
  const { toggleLanguage } = useLanguageContext();

  // Load the language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== locale) {
      router.replace(router.pathname, router.asPath, { locale: savedLanguage });
    }
  }, [locale, router]);

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
    localStorage.setItem("language", lang); // Store the selected language
  };

  // Toggle between languages
  const handleToggle = () => {
    const newLang = locale === "en" ? "ar" : "en";
    changeLanguage(newLang);
    toggleLanguage(); // Call toggleLanguage after changing the language
  };

  return (
    <div>
      <button
        className="font-ar"
        onClick={handleToggle}
        style={{
          color: color.color,
        }}>
        {locale === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
