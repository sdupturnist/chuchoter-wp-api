const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
  <div className="join mx-auto">
     {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`join-item btn bg-transparent border-0 shadow-none hover:!bg-transparent hover:opacity-30 text-black ${page === currentPage ? 'text-opacity-30' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
