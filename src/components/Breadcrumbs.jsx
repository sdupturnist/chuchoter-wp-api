import { useLanguageContext } from "@/context/LanguageContext"
import { useSiteContext } from "@/context/siteContext";
import { frontendUrl, transalateText } from "@/utils/variables";
import Link from "next/link"





export default function Breadcrumbs({ pages }) {

  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link 
       href={`${frontendUrl}/${language}`}
          >
         {transalateText(
                        siteTransalations?.generalTranslations?.home,
                        language
                      )}
          </Link>
        </li>
        {pages && pages.map((item, key) => {
         return (
           item && <li className="capitalize" key={key}>
              {item && <Link href={item.link}>
                {item.name}
              </Link>}
              {!item && <span className="text-gray-400">{item &&  item.name}</span>}
            </li>
         
          )
        })}
      </ul>
    </div>
  )
}


