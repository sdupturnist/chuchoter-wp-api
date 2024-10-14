import { useLanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router"; // Import useRouter from Next.js

export default function LanguageSwitch() {
    const { language, toggleLanguage } = useLanguageContext();
    const router = useRouter(); // Get the router instance

    // Define labels for Arabic and English
    const labels = {
        en: "Switch to Arabic",
        ar: "تغيير إلى الإنجليزية",
    };

    const handleLanguageToggle = () => {
        // Determine the current language
        const currentLanguage = localStorage.getItem('language') || 'en';
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'; // Toggle language
        localStorage.setItem('language', newLanguage); // Update localStorage

        // Update the language context
        toggleLanguage();
      

        // Get the current pathname
        const currentPath = router.pathname;
        const newSlug = newLanguage; // Use the new language as the slug

        // Create the new path with the updated slug
        const newPath = currentPath.split('/').slice(0, -1).join('/') + `/${newSlug}`;

        // Push the new path to the router
        router.push(newPath);
        
    };

    return (
        <>
            <button 
                onClick={handleLanguageToggle} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {labels[language] || labels.en} {/* Default to English if language code is unknown */}
            </button>
        </>
    );
}
