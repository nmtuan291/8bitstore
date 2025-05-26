import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Product } from "../../interfaces/interfaces";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSort from "./ProductSort";
import LoadingOverlay from "../../components/LoadingOverlay";
import ProductFilter from "./ProductFilter";
import axios from "../../apis/axios";
import "./ProductList.scss"
import { useLocation } from "react-router-dom";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>("Giá thấp đến cao");
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams();
            
            if (searchParams.productName) {
                params.append('productName', searchParams.productName);
            }
            searchParams.types.forEach(type => params.append('type', type));
            searchParams.manufacturers.forEach(manufacturer => params.append('manufacturer', manufacturer));
            searchParams.genres.forEach(genre => params.append('genre', genre));

            const query = `/api/Product/get-products?${params.toString()}`
            const response = await axios.get(query);
            setProducts(response.data);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const pageSize: number = 12;

    let diff: number = 0;
    let pageEnd: number;
    if (currentPage * pageSize > products.length) {
        pageEnd = products.length;
        diff = currentPage * pageSize - pageEnd;
    } else {
        pageEnd = currentPage * pageSize;
    }
    const pageStart: number = pageEnd - pageSize + diff;
    const productPage: Product[] = products.slice(pageStart, pageEnd);

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
                <div className="product-list-header">
                    <p className="product-filter">Hiển thị sản phẩm</p>
                    <ProductSort filterString={filter} onFilterClick={(filterName:string) => handleFilterClick(filterName)} />
                </div>
                <div className="product-list">
                    {productPage.map((product: Product, index: number) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
                <div className="pagination">
                    <Pagination 
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={products.length}
                        pageSize={pageSize}
                        siblingCount={1}
                        onPageChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
        
    );
}


export default ProductList;