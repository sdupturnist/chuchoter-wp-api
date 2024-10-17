import { useLanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export default function LanguageSwitch({color}) {
    const { language, toggleLanguage } = useLanguageContext();
    const router = useRouter();

    const labels = {
        en: "عربي",
        ar: "English"
    };


    const handleLanguageToggle = () => {
        const currentLanguage = language; // Use the context language
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', newLanguage);

        toggleLanguage();

        const { pathname, query } = router;

        // Construct the new path by replacing the last segment (current language)
        const pathSegments = pathname.split('/');
        pathSegments[pathSegments.length - 1] = newLanguage; // Update last segment to new language
        const newPath = pathSegments.join('/');

        // Exclude the slug parameter from the query
        const { slug, ...updatedQuery } = query;

        // Push the new path with existing query parameters, excluding slug
        router.push({
            pathname: newPath,
            query: updatedQuery,
        });
    };

    return (
        <>
           <button 
                onClick={handleLanguageToggle} 
               className="uppercase font-ar"
                style={{
                    color:color,
                }}
            >
                {labels[language] || labels.en}
            </button>
        </>
    );
}
