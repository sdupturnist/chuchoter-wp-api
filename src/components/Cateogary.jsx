
import PageHeader from "./PageHeader";
import ProductListing from "./ProductListing";
import { useRouter } from "next/router";


export default function Category({
  pageHeaderData,
  cateogaryData,
  cateogaryCurrentPage,
  cateogaryTotalPages,
  cateogaryOnPageChange,
  cateogaryProductsPerPage,
  cateogaryMainCat,
  cateogaryTotalCount,
  cateogaryCurrenPageNumber,
  tags,
}) {
  const router = useRouter();
  const { query } = router;



  return (
    <>
      <PageHeader
        type="cat"
        catcount={5}
        title={query.category || ""}
        mainCat={query.category}
        //subCat={query.main_categories}
        data={pageHeaderData}
        tagPageHeaderData={tags || []}
      />

      <ProductListing
        data={cateogaryData}
        currentPage={cateogaryCurrentPage}
        totalPages={cateogaryTotalPages}
        onPageChange={cateogaryOnPageChange}
        productsPerPage={cateogaryProductsPerPage}
        mainCat={cateogaryMainCat}
        totalCount={cateogaryTotalCount}
        currenPageNumber={cateogaryCurrenPageNumber}
      />
    </>
  );
}
