import { useEffect, useState, useRef } from "react";
import { IProduct } from "../../interfaces/interfaces";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import ProductFilter from "./ProductFilter";
import "./ProductList.scss"

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>("Giá thấp đến cao");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let fetchUrl: string;
                if (filter === "Giá thấp đến cao") {
                    fetchUrl = 'http://localhost:8080/get-all-products';
                } else {
                    fetchUrl = 'http://localhost:8080/get-filtered-products?topNum=5';
                }

                const response = await fetch(fetchUrl);
                const data = await response.json();
                setProducts(data.data);
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
    const productPage: IProduct[] = products.slice(pageStart, pageEnd);

    const handleFilterClick = (filter: string) => {
        setFilter(filter);
    };

    return (
        <div className="product-list-container">
            <h1>8BITSTORE</h1>
            <div className="product-list-header">
                <p className="product-filter">Hiển thị sản phẩm</p>
                <ProductFilter filterString={filter} onFilterClick={(filterName:string) => handleFilterClick(filterName)} />
            </div>
            <div className="product-list">
                {productPage.map((product: IProduct, index: number) => (
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