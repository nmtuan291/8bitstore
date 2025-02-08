import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";

interface PaginationProps {
    totalCount: number,
    currentPage: number,
    pageSize: number,
    onPageChange: () => void,
    siblingCount : number
}

const Pagination:React.FC<PaginationProps> 
= ({ totalCount, currentPage, pageSize, onPageChange, siblingCount }) => {
        
}