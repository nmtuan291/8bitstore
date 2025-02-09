import { useState, useEffect } from "react";
import ProductItem from "../../../components/ProductCard";
import { IProduct } from "../../../interfaces/interfaces";
import "./LatestProduct.css"


const LatestProduct: React.FC = () => {
    const [ products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/get-filtered-products?sortBy=new&topNum=5")
            .then(response => response.json())
            .then(data => setProducts(data.data))
            .catch(error => console.log(error.message));
    }, [products]);

    return (
        <div style={{ marginTop: "50px"}}>
            <h2 style={{ marginLeft: "13%"}}>Hàng mới về</h2>
            <div className="d-flex gap-3 w-100 justify-content-center product-item">
                { products.map((product, index) => 
                    <ProductItem
                        key={index}
                        productName={product.productName} 
                        price={product.price} 
                        manufacturer={product.manufacturer}
                    />
                    ) 
                }
            </div>
        </div>
    );
}

export default LatestProduct;  