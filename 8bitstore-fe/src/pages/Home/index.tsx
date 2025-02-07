import { useState } from "react";
import NavBar from '../../components/NavBar';
import NavBarList from '../../components/NavBar/NavBarList';
import NavBarListTest from '../../components/NavBar/NavBarListTest';
import ConsoleStore from './ConsoleStore/ConsoleStore';
import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ProductItem from '../../components/ProductItem';
import ProductSectionTest from '../Product/ProductSection/ProductSectionTest';
import ImageCarousel from './ImageCarousel';
import LoginForm from "../../components/LoginForm";


const HomePage: React.FC = () => {
    const [ userIconClicked, setUserIconClicked] = useState<boolean>(false);
    
    const handleUserClick = () => {
        setUserIconClicked(true);
    }
    
    return (
        <div>
            { userIconClicked && <LoginForm />}
            <NavBar onUserClick={handleUserClick}/>
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