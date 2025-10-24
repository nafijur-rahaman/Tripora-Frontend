import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    const renderPageNumbers = () => {
        const pageNumbers = [];
        
        // This is a simple pagination logic, can be made more complex
        // Here, we just show 5 numbers at a time
        
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 2) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage > totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors
                        ${i === currentPage 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <nav className="flex justify-center items-center space-x-2 mt-16">
            <button 
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FiChevronLeft />
            </button>
            
            {renderPageNumbers()}
            
            <button 
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FiChevronRight />
            </button>
        </nav>
    );
};

export default Pagination;