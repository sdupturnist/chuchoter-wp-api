import { useThemeContext } from "@/context/themeContext";

const Pagination = ({ currentPage, totalPages, onPageChange, currenPageNumber }) => {
  const { themeLayout } = useThemeContext();
  const currentTheme = themeLayout[0].toString().toLowerCase();

  // Define the maximum number of buttons to display
  const maxVisiblePages = 5;

  // Calculate the range of pages to show
  const getPageRange = () => {
    let start = currentPage - Math.floor(maxVisiblePages / 2);
    let end = currentPage + Math.floor(maxVisiblePages / 2);

    // If the range is too small, adjust it so that it stays within the totalPages
    if (start < 1) {
      start = 1;
      end = Math.min(start + maxVisiblePages - 1, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const visiblePages = getPageRange();

  return (
    <div className="join mx-auto">
      {visiblePages.map(page => (
        <button
          key={page}
          disabled={currenPageNumber === page}  // Disable button if it's the current page
          onClick={() => onPageChange(page)}
          className={`!bg-transparent border-${currentTheme}-100 text-${currentTheme}-100 join-item btn border-0 shadow-none hover:opacity-30 ${page === currentPage ? 'text-opacity-30' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
