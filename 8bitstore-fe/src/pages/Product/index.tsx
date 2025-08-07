import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Product } from "../../interfaces/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSort from "./ProductSort";
import LoadingOverlay from "../../components/LoadingOverlay";
import ProductFilter from "./ProductFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTh, faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.scss"
import { useGetProductsQuery } from "../../store/api";

const ProductList: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
    const location = useLocation();
    
    // Track URL changes
    const searchParams = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        const params = {
            productName: queryParams.get("productName") || "",
            types: queryParams.getAll("type"),
            manufacturers: queryParams.getAll("manufacturer"),
            genres: queryParams.getAll("genre"),
            minPrice: queryParams.get("minPrice"),
            maxPrice: queryParams.get("maxPrice"),
            sort: queryParams.get("sort") || "Phổ biến", // Default sort
            page: parseInt(queryParams.get("page") || "1", 10)
        };
        console.log("searchParams parsed:", params);
        return params;
    }, [location.search]);

    // Use page from URL instead of local state
    const currentPage = searchParams.page;
    
    // Use sort from URL instead of local state
    const currentSort = searchParams.sort;
    
    // Build params string for API
    const paramsString = useMemo(() => {
        const params = new URLSearchParams();
        if (searchParams.productName) {
            params.append('productName', searchParams.productName);
        }
        searchParams.types.forEach(type => params.append('type', type));
        searchParams.manufacturers.forEach(manufacturer => params.append('manufacturer', manufacturer));
        searchParams.genres.forEach(genre => params.append('genre', genre));
        searchParams.minPrice !== "0" && params.append('minPrice', searchParams.minPrice ?? "");
        searchParams.maxPrice !== "0" && params.append('maxPrice', searchParams.maxPrice ?? "");
        
        // Add sort parameters based on the selected sort option
        if (searchParams.sort) {
            switch (searchParams.sort) {
                case "Phổ biến":
                    params.append('SortByDate', '1'); // Sort by date for popularity
                    break;
                case "Giá thấp đến cao":
                    params.append('SortByPrice', '1');
                    break;
                case "Giá cao đến thấp":
                    params.append('SortByPrice', '-1'); // Use negative for descending
                    break;
                case "Mới nhất":
                    params.append('SortByDate', '1');
                    break;
                case "Đánh giá cao":
                    params.append('SortByName', '1'); // Fallback to name sort
                    break;
                default:
                    params.append('SortByDate', '1'); // Default sort
                    break;
            }
        }
        
        return params.toString();
    }, [searchParams]);

    const { data, isLoading, error } = useGetProductsQuery({ page: currentPage, params: paramsString });
    const navigate = useNavigate();
    
    // Function to update page in URL
    const setCurrentPage = useCallback((newPage: number) => {
        console.log("setCurrentPage called with:", newPage);
        const params = new URLSearchParams(location.search);
        if (newPage === 1) {
            params.delete('page'); // Remove page=1 from URL for cleaner URLs
        } else {
            params.set('page', newPage.toString());
        }
        const newUrl = `?${params.toString()}`;
        console.log("setCurrentPage navigating to:", newUrl);
        navigate(newUrl);
    }, [navigate, location.search]);
  
    const handleSortChange = useCallback((newSort: string) => {
        console.log("handleSortChange called with:", newSort);
        const params = new URLSearchParams(location.search);
        if (newSort === "Phổ biến") {
            params.delete('sort'); // Remove sort from URL for default
        } else {
            params.set('sort', newSort);
        }
        // Reset to page 1 when sorting changes
        params.delete('page');
        const newUrl = `?${params.toString()}`;
        console.log("handleSortChange navigating to:", newUrl);
        navigate(newUrl);
    }, [navigate, location.search]);

    const handleFilterClick = useCallback((filters: any) => {
        console.log("handleFilterClick called with:", filters);
        
        const isAllEmpty = filters.type.length === 0 && 
                          filters.manufacturer.length === 0 && 
                          filters.genres.length === 0 && 
                          filters.minPrice === 0 && 
                          filters.maxPrice === 0;
        
        if (isAllEmpty) {
            console.log("All filters empty, not changing URL");
            return;
        }
        
        const params = new URLSearchParams();
        const minPrice = filters.minPrice;
        const maxPrice = filters.maxPrice;
  
        // Build new filter params from scratch
        filters.type.forEach((type: string) => params.append('type', type));
        filters.manufacturer.forEach((manufacturer: string) => params.append('manufacturer', manufacturer));
        filters.genres.forEach((genre: string) => params.append('genre', genre));
        minPrice !== 0 && params.append('minPrice', minPrice);
        maxPrice !== 0 && params.append('maxPrice', maxPrice);
        
        // Preserve current sort only if it's not the default
        if (currentSort && currentSort !== "Phổ biến") {
            params.set('sort', currentSort);
        }
        
        const newUrl = `?${params.toString()}`;
        console.log("handleFilterClick navigating to:", newUrl);
        navigate(newUrl);
    }, [navigate, currentSort]);

    const getSearchQuery = () => {
        if (searchParams.productName) {
            return `"${searchParams.productName}"`;
        }
        
        const activeFilters = [];
        if (searchParams.types.length > 0) activeFilters.push(...searchParams.types);
        if (searchParams.manufacturers.length > 0) activeFilters.push(...searchParams.manufacturers);
        if (searchParams.genres.length > 0) activeFilters.push(...searchParams.genres);
        
        return activeFilters.length > 0 ? activeFilters.join(", ") : "Tất cả sản phẩm";
    };

    const getResultsCount = () => {
        if (!data) return 0;
        return data.products.length;
    };

    return (
        <div className="product-page">
            {isLoading && <LoadingOverlay />}
            
            <div className="product-page-container">
                <aside className={`filter-sidebar ${showMobileFilter ? 'mobile-open' : ''}`}>
                    <div className="filter-header">
                        <h3>
                            <FontAwesomeIcon icon={faFilter} />
                            Filters
                        </h3>
                        <button 
                            className="close-filter mobile-only"
                            onClick={() => setShowMobileFilter(false)}
                        >
                            ×
                        </button>
                    </div>
                    <ProductFilter onFilterChange={handleFilterClick} />
                </aside>
                {showMobileFilter && (
                    <div 
                        className="filter-overlay mobile-only"
                        onClick={() => setShowMobileFilter(false)}
                    />
                )}
                <main className="product-main">
                    <div className="search-results-header">
                        <div className="search-info">
                            <h1 className="search-title">
                                <FontAwesomeIcon icon={faSearch} />
                                Kết quả tìm kiếm cho: <span className="search-query">{getSearchQuery()}</span>
                            </h1>
                            <p className="results-count">
                                Tìm thấy {getResultsCount()} {getResultsCount() === 1 ? 'sản phẩm' : 'sản phẩm'}
                            </p>
                        </div>
                    </div>
                    <div className="product-toolbar">
                        <div className="toolbar-left">
                            <button 
                                className="mobile-filter-toggle mobile-only"
                                onClick={() => setShowMobileFilter(true)}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                Bộ lọc
                            </button>
                            <div className="view-toggle desktop-only">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <FontAwesomeIcon icon={faTh} />
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <FontAwesomeIcon icon={faList} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="toolbar-right">
                            <ProductSort 
                                filterString={currentSort} 
                                onFilterClick={handleSortChange} 
                            />
                        </div>
                    </div>
                    {data && data.products.length > 0 ? (
                        <div className={`products-container ${viewMode}-view`}>
                            <div className="products-grid">
                                {data.products.map((product: Product, index: number) => (
                                    <ProductItem 
                                        key={product.productId || index} 
                                        product={product}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : !isLoading ? (
                        <div className="no-products">
                            <div className="no-products-content">
                                <div className="no-products-icon">🔍</div>
                                <h3>Không tìm thấy sản phẩm</h3>
                                <p>Hãy thử điều chỉnh tiêu chí tìm kiếm hoặc duyệt qua các danh mục của chúng tôi.</p>
                                <button 
                                    className="clear-filters-btn"
                                    onClick={() => navigate('/product')}
                                >
                                    Xóa tất cả bộ lọc
                                </button>
                            </div>
                        </div>
                    ) : null}
                    {data && data.products.length > 0 && (
                        <div className="pagination-container">
                            <Pagination 
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={data ? (data.totalPages * data.pageSize) : 0}
                                pageSize={data ? data.pageSize : 1}
                                siblingCount={1}
                                onPageChange={(page: number) => setCurrentPage(page)}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductList;