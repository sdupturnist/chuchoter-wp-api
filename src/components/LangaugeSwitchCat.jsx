import { useLanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export default function LanguageSwitch() {
    const { language, toggleLanguage } = useLanguageContext();
    const router = useRouter();

    const labels = {
        en: "Arabic",
        ar: "عربي"
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
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {labels[language] || labels.en}
            </button>
        </>
    );
}
