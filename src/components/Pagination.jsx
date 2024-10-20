import { useThemeContext } from "@/context/themeContext";



const Pagination = ({ currentPage, totalPages, onPageChange, currenPageNumber }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { themeLayout } = useThemeContext();
  const currentTheme = themeLayout[0].toString().toLowerCase()

  return (
  <div className="join mx-auto">
     {pages.map(page => (
        <button
          key={page}
          disabled={currenPageNumber == page ? 'true' : null}
          onClick={() => onPageChange(page)}
          className={`!bg-transparent border-${currentTheme}-100 text-${currentTheme}-100 join-item btn border-0 shadow-none  hover:opacity-30  ${page === currentPage ? 'text-opacity-30' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
