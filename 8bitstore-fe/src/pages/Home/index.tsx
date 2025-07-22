import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ImageCarousel from './ImageCarousel';
import ProductCarousel from "../../components/ProductCarousel";
import "./Home.scss";
import dualsenseImge from "../../assets/images/dualsense.jpg";


const HomePage: React.FC = () => {
    
    return (
        <div>
            <ImageCarousel />
            <div className="console-store-container">
                <ConsoleStoreTest />
            </div>
            <ProductCarousel title="Sản phẩm nổi bật"></ProductCarousel>
            <img src={dualsenseImge} />
            <ProductCarousel title="Sản phẩm bán chạy"></ProductCarousel>
            <ProductCarousel title="Sản phẩm mới"></ProductCarousel>
        </div>
    )
};

export default HomePage;