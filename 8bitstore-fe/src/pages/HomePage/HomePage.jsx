import NavBar from '../../components/NavBar/NavBar';
import NavBarList from '../../components/NavBarList/NavBarList';
import NavBarListTest from '../../components/NavBarList/NavBarListTest';
import ConsoleStore from '../../components/ConsoleStore/ConsoleStore';
import ConsoleStoreTest from '../../components/ConsoleStore/ConsoleStoreTest';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductSectionTest from '../../components/ProductSection/ProductSectionTest';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import LoginForm from "../../components/LoginForm/LoginForm";


const HomePage = () => {
    
    return (
        <div>
            <NavBar />
            <ImageCarousel />

            <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px"
                }}>
                <ConsoleStoreTest />
            </div>

        </div>
    )
};

export default HomePage;