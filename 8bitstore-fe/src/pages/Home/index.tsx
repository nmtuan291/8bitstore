import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ImageCarousel from './ImageCarousel';
import ProductCarousel from "../../components/ProductCarousel";
import "./Home.scss";


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
            </div>
            <ProductCarousel></ProductCarousel>
            <ProductCarousel></ProductCarousel>

        </div>
    )
};

export default HomePage;