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
  totalCount,
  mainCat,
  currenPageNumber
}) {
  const { language } = useLanguageContext();

  const { themeLayout } = useThemeContext();
  const { siteTransalations } = useSiteContext();



  return data && data.length > 0 ? (
    <>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]" >
        {data &&
          data.map((item, key) => {
            return (
              <div className="w-full grid justify-between" key={key}>
                <Card
                  type="cat"
                  item={item}
                  mainCat={mainCat}
                  subCat={item?.categories[0]?.name}
                  theme={themeLayout}
                />
              </div>
            );
          })}
      </div>
      <div className="text-center pb-[80px] lg:pb-[0]">
        
     {totalCount > productsPerPage ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            currenPageNumber={currenPageNumber}
          />
        ) : null}
      </div>
    </>
  ) : (
    <NoData
      title={transalateText(
        siteTransalations?.generalTranslations?.noProducts,
        language
      )}
    />
  );
}

// import { transalateText } from "@/utils/variables";
// import Card from "@/components/Cards";
// import Pagination from "@/components/Pagination";
// import NoData from "@/components/Nodata";
// import { useThemeContext } from "@/context/themeContext";
// import { useLanguageContext } from "@/context/LanguageContext";
// import { useSiteContext } from "@/context/siteContext";
// import { useEffect, useState, useCallback, useRef } from "react";
// import Loading from "./Loading";


// export default function ProductListing({
//   data,
//   currentPage,
//   totalPages,
//   onPageChange,
//   productsPerPage,
//   totalCount,
//   mainCat,
//   currenPageNumber
// }) {
//   const [loading, setLoading] = useState(true);
//   const { language } = useLanguageContext();
//   const { themeLayout } = useThemeContext();
//   const { siteTransalations } = useSiteContext();
  

//   // useRef to store the timeout ID for debouncing
//   const debounceTimeoutRef = useRef(null);

//   // Custom debounced function
//   const debouncedOnPageChange = (newPage) => {
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current);
//     }

//     debounceTimeoutRef.current = setTimeout(() => {
//       onPageChange(newPage);
//     }, 300);  // Adjust the delay as needed
//   };




//   useEffect(() => {
//     if (data) {
//       setLoading(false);
//     } else {
//       setLoading(true);
//     }
//   }, [data]);

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }



//   return (
//     <>
//       <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
//         {data && data.map((item, key) => (
//           <div className="w-full grid justify-between" key={key}>
//             <Card
//               type="cat"
//               item={item}
//               mainCat={mainCat}
//               subCat={item?.categories[0]?.name}
//               theme={themeLayout}
//             />
//           </div>
//         ))}
//       </div>
      
//       <div className="text-center pb-[80px] lg:pb-[0]">
//         {totalCount > productsPerPage ? (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={debouncedOnPageChange}  // Using custom debounced function here
//             currenPageNumber={currenPageNumber}
//           />
//         ) : null}
//       </div>
//     </>
//   )
// }

// //   return data && data.length !== 0 ? (
// //     <>
// //       <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
// //         {data.map((item, key) => (
// //           <div className="w-full grid justify-between" key={key}>
// //             <Card
// //               type="cat"
// //               item={item}
// //               mainCat={mainCat}
// //               subCat={item?.categories[0]?.name}
// //               theme={themeLayout}
// //             />
// //           </div>
// //         ))}
// //       </div>
      
// //       <div className="text-center pb-[80px] lg:pb-[0]">
// //         {totalCount > productsPerPage ? (
// //           <Pagination
// //             currentPage={currentPage}
// //             totalPages={totalPages}
// //             onPageChange={debouncedOnPageChange}  // Using custom debounced function here
// //             currenPageNumber={currenPageNumber}
// //           />
// //         ) : null}
// //       </div>
// //     </>
// //   ) : (
// //     <NoData
// //       title={transalateText(
// //         siteTransalations?.generalTranslations?.noProducts,
// //         language
// //       )}
// //     />
// //   );
// // }
