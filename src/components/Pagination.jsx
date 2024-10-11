import { useThemeContext } from "@/context/themeContext";



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { themeLayout } = useThemeContext();
  const currentTheme = themeLayout[0].toString().toLowerCase()

  return (
  <div className="join mx-auto">
     {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`border-${currentTheme}-100 text-${currentTheme}-100 join-item btn bg-transparent border-0 shadow-none hover:!bg-transparent hover:opacity-30  ${page === currentPage ? 'text-opacity-30' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
