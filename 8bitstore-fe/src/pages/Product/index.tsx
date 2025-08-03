import React, { useEffect, useState, useMemo } from "react";
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("Giá thấp đến cao");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
    const location = useLocation();
    
    const searchParams = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        return {
            productName: queryParams.get("productName") || "",
            types: queryParams.getAll("type"),
            manufacturers: queryParams.getAll("manufacturer"),
            genres: queryParams.getAll("genre"),
            minPrice: queryParams.get("minPrice"),
            maxPrice: queryParams.get("maxPrice")
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
        searchParams.minPrice !== "0" && params.append('minPrice', searchParams.minPrice ?? "");
        searchParams.maxPrice !== "0" && params.append('maxPrice', searchParams.maxPrice ?? "");
        return params.toString();
    }, [searchParams]);

    const { data, isLoading, error } = useGetProductsQuery({ page: currentPage, params: paramsString });
    const navigate = useNavigate();
    
    const handleFilterClick = (filters: any) => {
        const params = new URLSearchParams();
        const minPrice = filters.minPrice;
        const maxPrice = filters.maxPrice;
  
        filters.type.forEach((type: string) => params.append('type', type));
        filters.manufacturer.forEach((manufacturer: string) => params.append('manufacturer', manufacturer));
        filters.genres.forEach((genre: string) => params.append('genre', genre));
        minPrice !== 0 && params.append('minPrice', minPrice);
        maxPrice !== 0 && params.append('maxPrice', maxPrice);
        
        navigate(`?${params.toString()}`);
        setCurrentPage(1); // Reset to first page when filters change
    };

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

    // Reset page when location changes
    useEffect(() => {
        setCurrentPage(1);
    }, [location.search]);

    return (
        <div className="product-page">
            {isLoading && <LoadingOverlay />}
            
            <div className="product-page-container">
                {/* Sidebar Filter */}
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

                {/* Mobile Filter Overlay */}
                {showMobileFilter && (
                    <div 
                        className="filter-overlay mobile-only"
                        onClick={() => setShowMobileFilter(false)}
                    />
                )}

                {/* Main Content */}
                <main className="product-main">
                    {/* Search Results Header */}
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

                    {/* Toolbar */}
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
                                filterString={sort} 
                                onFilterClick={(filterName: string) => setSort(filterName)} 
                            />
                        </div>
                    </div>

                    {/* Products Grid/List */}
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

                    {/* Pagination */}
                    {data && data.products.length > 0 && (
                        <div className="pagination-container">
                            <Pagination 
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={data ? data.totalPages : 0}
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