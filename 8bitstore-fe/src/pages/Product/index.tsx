import { useEffect, useState, useRef } from "react";
import { IProduct } from "../../interfaces/interfaces";
import ProductItem from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import "./ProductList.css"

const ProductList: React.FC = () => {
    const [ products , setProducts ] = useState<IProduct[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ filter, setFilter ] = useState<string>("Giá thấp đến cao");
    const [ filterClick, setFilterClick ] = useState<boolean>(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            let fetchUrl: string;
            if (filter === "Giá thấp đến cao") {
                fetch('http://localhost:8080/get-all-products')
                .then(response => response.json())
                .then(products => setProducts(products.data))
                .catch((error: Error) => console.log(error.message));
            } else {
                setProducts([]);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }, [filter]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (filterRef && !filterRef.current?.contains(event.target as Node)) {
                setFilterClick(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    })

    const pageSize: number = 12;

    let diff: number = 0;
    let pageEnd: number
    if (currentPage * pageSize > products.length) {
        pageEnd = products.length;
        diff = currentPage * pageSize - pageEnd;
    } else {
        pageEnd = currentPage * pageSize;
    }
    const pageStart: number = pageEnd - pageSize + diff;
    const productPage: IProduct[] = products.slice(pageStart, pageEnd);

    const filters: string[] = ["Phổ biến", "Giá thấp đến cao", "Giá cao đến thấp"];

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget.textContent) {
            setFilter(event.currentTarget.textContent);
            setFilterClick(false);
        }
    }

    const handleDropdownClick = () => {
        setFilterClick(!filterClick);
    }

    return (
        <div className="product-list-container">
            <h1 className="border">8BITSTORE</h1>
            <div className="product-list-header" ref={filterRef}>
                <p className="product-filter">Hiển thị sản phẩm</p>
                <div className="filter-list-container">
                    <p onClick={handleDropdownClick}>{filter}</p>
                    <ul className={`filter-list ${!filterClick ? "hide" : ""}`}>
                        {
                            filters.map((filter: string, index: number) => {
                                return (
                                    <li 
                                        key={index}
                                        onClick={handleFilterClick}
                                    >
                                        {filter}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="product-list">
                {productPage.map((product: IProduct, index: number) => <ProductItem key={index} product={product} />)}
            </div>
            <div className="pagination">
                <Pagination 
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={products.length}
                    pageSize={pageSize}
                    siblingCount={1}
                    onPageChange={(page: number) => {
                        setCurrentPage(page)
                    }}
                />
            </div>
        </div>
    )
}

export default ProductList;