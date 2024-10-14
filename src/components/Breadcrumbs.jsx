import { useLanguageContext } from "@/context/LanguageContext"
import { generalTranslations } from "@/utils/transalations"
import { frontendUrl } from "@/utils/variables";
import Link from "next/link"




export default function Breadcrumbs({ pages }) {

  const { language } = useLanguageContext();


  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link 
       href={`${frontendUrl}/${language}`}
          >
          {generalTranslations.home[language]}
          </Link>
        </li>
        {pages && pages.map((item, key) => {
         return (
            <li className="capitalize" key={key}>
              {item.link && <Link href={item.link}>
                {item.name}
              </Link>}
              {!item.link && <span className="text-gray-400">{item.name}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}


