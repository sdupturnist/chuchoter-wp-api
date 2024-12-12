import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/LanguageContext";
import debounce from "lodash.debounce";

const LanguageSwitcher = ({ color }) => {
  const router = useRouter();
  const { locale, pathname, query } = router;
  const { toggleLanguage } = useLanguageContext();

  // Load the language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== locale) {
      router.replace({ pathname, query }, undefined, { locale: savedLanguage });
    }
  }, [locale, router, pathname, query]);

  // Debounced function to handle language change
  const debouncedChangeLanguage = useCallback(
    debounce((lang) => {
      router.push({ pathname, query }, undefined, { locale: lang });
      localStorage.setItem("language", lang);
    }, 300),
    [pathname, query]
  );

  const handleToggle = () => {
    const newLang = locale === "en" ? "ar" : "en";
    debouncedChangeLanguage(newLang);
    toggleLanguage();
  };

  return (
    <div>
      <button
        className="font-ar"
        onClick={handleToggle}
        style={{ color: color }}>
        {locale === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
