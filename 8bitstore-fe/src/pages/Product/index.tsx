import { useEffect, useState, useRef } from "react";
import { Product } from "../../interfaces/interfaces";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSort from "./ProductSort";
import axios from "../../apis/axios";
import "./ProductList.scss"

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>("Giá thấp đến cao");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/Product/get-products")
                setProducts(response.data);
            } catch (error: any) {
                console.log(error.message);
            }
        };
        fetchProducts();
    }, [filter]);

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
        <div className="product-list-container">
            <h1>8BITSTORE</h1>
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
    );
}


export default ProductList;