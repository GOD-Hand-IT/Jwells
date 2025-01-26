import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageSelect }) => {
    return (
        <nav className="flex items-center gap-x-1" aria-label="Pagination">
            <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous" onClick={onPrevPage} disabled={currentPage === 1}>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onPageSelect(index + 1)}
                        type="button"
                        className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${currentPage === index + 1 ? 'bg-gray-200 dark:bg-neutral-600' : 'hover:bg-gray-100 dark:hover:bg-white/10'
                            } text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white`}
                        aria-current={currentPage === index + 1 ? "page" : undefined}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next" onClick={onNextPage} disabled={currentPage === totalPages}>
                <span>Next</span>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    );
};

export default Pagination;
