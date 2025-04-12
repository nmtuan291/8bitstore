import { useState } from "react";
import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ImageCarousel from './ImageCarousel';
import ProductCarousel from "../../components/ProductCarousel";


const HomePage: React.FC = () => {
    
    return (
        <div>
            <ImageCarousel />
            <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px"
                }}>
                <ConsoleStoreTest />
                <ProductCarousel></ProductCarousel>
            </div>

        </div>
    )
};

export default HomePage;