import { useLanguageContext } from "@/context/LanguageContext";


export default function LanguageSwitch({label}){

    const { language, toggleLanguage } = useLanguageContext();
   
    return(

       
        <>
         <button onClick={toggleLanguage} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
   {label}
      </button>
        </>
    )
}