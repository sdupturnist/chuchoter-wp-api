import { useLanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export default function LangaugeSwitchSingleProduct() {
    
    const { language, toggleLanguage } = useLanguageContext();
    const router = useRouter();

    // Define labels for Arabic and English
    const labels = {
        en: "Arabic",
        ar: "عربي"
    };


    const handleLanguageToggle = () => {
        // Determine the current language
        const currentLanguage = localStorage.getItem('language') || 'en';
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'; // Toggle language
        localStorage.setItem('language', newLanguage); // Update localStorage

        // Update the language context
        toggleLanguage();

        // Navigate to the home page
        router.push('/'); // Redirect to the home page
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
