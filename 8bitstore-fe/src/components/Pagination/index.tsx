import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { UNSAFE_getPatchRoutesOnNavigationFunction } from "react-router-dom";
import "./pagination.css"

interface PaginationProps {
    totalCount: number,
    currentPage: number,
    pageSize: number,
    onPageChange: (pageIndex: number) => void,
    siblingCount : number,
    className: string
}

const Pagination:React.FC<PaginationProps> 
= ({ totalCount, currentPage, pageSize, onPageChange, siblingCount, className }) => {
        
    const pagination = usePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    })

    if (currentPage === 0 || pagination.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    const lastPage = pagination[pagination.length - 1];
    
    return (
        <ul className={`pagination-container ${className ? className : ""}`}>
            <li 
                className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={onPrevious}
            >
                <div className="arrow left"></div>   
            </li>
            {
                pagination.map(pageItem => {
                    if (pageItem === "...") {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }
                    return(
                        <li 
                            className={`pagination-item ${currentPage === pageItem ? "selected" : ""}`}
                            onClick={() => onPageChange(pageItem)}
                        >
                            {pageItem}
                        </li>
                    );
                })
            }
            <li
                className={`pagination-item ${currentPage === lastPage ? "disabled" : ""}`}
                onClick={onNext}
            >
                <div className="arrow right"></div>
            </li>
        </ul>
    );
}

export default Pagination;