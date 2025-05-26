import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ImageCarousel from './ImageCarousel';
import ProductCarousel from "../../components/ProductCarousel";
import "./Home.scss";


const HomePage: React.FC = () => {
    
    return (
        <div>
            <ImageCarousel />
            <div className="console-store-container">
                <ConsoleStoreTest />
            </div>
            <ProductCarousel></ProductCarousel>
            <ProductCarousel></ProductCarousel>

        </div>
    )
};

export default HomePage;