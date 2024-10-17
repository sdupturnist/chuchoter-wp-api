import { useLanguageContext } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export default function LanguageSwitch() {
    const { language, toggleLanguage } = useLanguageContext();
    const router = useRouter();

    const labels = {
        en: "عربي",
        ar: "English"
    };

    const handleLanguageToggle = () => {
        const currentLanguage = localStorage.getItem('language') || 'en';
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', newLanguage);

        toggleLanguage();
        router.back();

        // Set a delay before reloading the page
        setTimeout(() => {
            location.reload();
        }, 1000); // 1000 milliseconds = 1 second
    };

    return (
        <>
            <button 
                onClick={handleLanguageToggle} 
                className="uppercase font-ar"
            >
                {labels[language] || labels.en}
            </button>
        </>
    );
}
