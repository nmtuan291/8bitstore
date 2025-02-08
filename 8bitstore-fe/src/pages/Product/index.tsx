import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/interfaces";
import ProductItem from "../../components/ProductItem";

const ProductList: React.FC = () => {
    const [ products , setProducts ] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/get-all-products')
            .then(response => response.json())
            .then(products => setProducts(products.data))
            .catch((error: Error) => console.log(error.message));
    }, []);

    return (
        <div className="border">
            <h1 className="border">8BITSTORE</h1>
            <div>
                <p>Hiển thị sản phẩm</p>
            </div>
            <div className="d-flex flex-wrap gap-3">
                {products.map((product: IProduct, index: number) => <ProductItem key={index} product={product} />)}
            </div>
        </div>
    )
}

export default ProductList;