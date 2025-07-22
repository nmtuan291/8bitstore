import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Product } from "../../interfaces/interfaces";
import { useLocation } from "react-router-dom";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSort from "./ProductSort";
import LoadingOverlay from "../../components/LoadingOverlay";
import ProductFilter from "./ProductFilter";
import banner from "../../assets/images/yotei-banner.jpg";
import "./ProductList.scss"
import { useGetProductsQuery } from "../../store/api";

const ProductList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>("Giá thấp đến cao");
    const location = useLocation();
    
    const searchParams = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        return {
            productName: queryParams.get("productName") || "",
            types: queryParams.getAll("type"),
            manufacturers: queryParams.getAll("manufacturer"),
            genres: queryParams.getAll("genre")
        };
    }, [location.search]);

    // Build params string for API
    const paramsString = useMemo(() => {
        const params = new URLSearchParams();
        if (searchParams.productName) {
            params.append('productName', searchParams.productName);
        }
        searchParams.types.forEach(type => params.append('type', type));
        searchParams.manufacturers.forEach(manufacturer => params.append('manufacturer', manufacturer));
        searchParams.genres.forEach(genre => params.append('genre', genre));
        return params.toString();
    }, [searchParams]);

    const { data, isLoading, error } = useGetProductsQuery({ page: currentPage, params: paramsString });

    const handleFilterClick = (filter: string) => {
        setFilter(filter);
    };

    return (
        <div className="product-page-container">
            { isLoading && <LoadingOverlay></LoadingOverlay> }
            <div className="product-filter">
                <ProductFilter />
            </div>
            <div className="product-list-container">
                <img src={banner}></img>
                <div className="product-list-header">
                    <p className="product-filter">Hiển thị sản phẩm</p>
                    <ProductSort filterString={filter} onFilterClick={(filterName:string) => handleFilterClick(filterName)} />
                </div>
                <div className="product-list">
                    {data && data.products.map((product: Product, index: number) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
                <div className="pagination">
                    <Pagination 
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={data ? data.totalPages : 0}
                        pageSize={data ? data.pageSize : 1}
                        siblingCount={1}
                        onPageChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
        
    );
}

export default ProductList;