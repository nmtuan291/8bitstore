import { useEffect, useState } from "react";
import ProductItem from "../../../components/ProductCard"

const ProductSection = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get-all-products')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])
    
    return (
        <div className="d-flex justify-content-center w-100 flex-wrap gap-3">
            { data && data.data.map((product, index) => <ProductItem key={ index } product={ product }/>) }
        </div>
    );
}

export default ProductSection;