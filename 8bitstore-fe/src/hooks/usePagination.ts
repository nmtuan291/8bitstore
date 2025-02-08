import { useMemo } from "react";

interface UsePaginationProps {
    totalCount: number,
    pageSize: number,
    siblingCount: number,
    currentPage: number
}

const range = (start: number, end: number): (number)[] => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}: UsePaginationProps): (number | string)[] => {
    const DOTS = "...";
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // [1...456...10]  [ 1...345...10 ] [1...3456...10]
        const leftMostSibling = Math.max(currentPage - siblingCount, 1);
        const rightMostSibling = Math.min(currentPage + siblingCount, totalPageCount);

        const showLeftDots = leftMostSibling > 2;
        const showRightDots = rightMostSibling < totalPageCount - 2;

        if (!showLeftDots && showRightDots) {
            const pagArray = range(1, rightMostSibling);
            return [...pagArray, DOTS, totalPageCount];
        }

        if (!showRightDots && showLeftDots) {
            const pagArray = range(leftMostSibling, totalPageCount);
            return [1, DOTS, ...pagArray];
        }

        if (showLeftDots && showRightDots) {
            const pagArray = range(leftMostSibling, rightMostSibling);
            return [1, DOTS, ...pagArray, DOTS, totalPageCount];
        }

        return range(1, totalPageCount);

    }, [totalCount, pageSize, siblingCount, currentPage]);
    
    
    return paginationRange;
}