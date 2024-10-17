import { transalateText } from "@/utils/variables";
import Card from "@/components/Cards";
import Pagination from "@/components/Pagination";
import NoData from "@/components/Nodata";
import { useThemeContext } from "@/context/themeContext";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";

export default function ProductListing({
  data,
  currentPage,
  totalPages,
  onPageChange,
  productsPerPage,
}) {
  
  const { language } = useLanguageContext();

  const { themeLayout } = useThemeContext();
  const { siteTransalations } = useSiteContext();



  return data.length > 0 ? (
    <>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
        {data &&
          data.map((item, key) => {
            return (
              <div className="w-full" key={key}>
                <Card type="cat"
                 item={item} 
                 subCat={item?.acf?.sub_categories[0]?.toLowerCase().replace(/\s+/g, '')}
                 theme={themeLayout} />
              </div>
            );
          })}
      </div>

      {data.length > productsPerPage - 3 ? (
        <div className="text-center pb-[100px] lg:pb-[0]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : null}
    </>
  ) : (
    <NoData title={transalateText(siteTransalations?.generalTranslations?.noProducts, language)} />
  );
}

