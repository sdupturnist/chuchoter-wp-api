// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const Pagination = ({ currentPage, pageCount }) => {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // Set mounted to true once the component is mounted
//     setMounted(true);
//   }, []);

//   const handlePageChange = (page) => {
//     // Extract current query parameters
//     const query = { ...router.query };
    
//     // Update the page parameter
//     query.page = page;

//     // Push new URL with updated page parameter
//     router.push({ pathname: router.pathname, query });
//   };

//   if (!mounted) {
//     // Optionally render a loading state or null while the component is mounting
//     return null;
//   }

//   return (
//     <div className="join mx-auto">
//       {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
//         <button
//           key={page}
//           onClick={() => handlePageChange(page)}
//           className={`join-item btn bg-transparent border-0 shadow-none hover:!bg-transparent hover:opacity-30 text-black ${page === currentPage ? 'text-opacity-30' : ''}`}
//         >
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;






// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {


  
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
