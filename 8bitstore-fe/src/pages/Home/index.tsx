import { useState } from "react";
import NavBar from '../../components/NavBar';
import NavBarList from '../../components/NavBar/NavMenu';
import NavBarListTest from '../../components/NavBar/NavBarListTest';
import ConsoleStore from './ConsoleStore/ConsoleStore';
import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ProductItem from '../../components/ProductCard';
import ProductSectionTest from '../Product/ProductSection/ProductSectionTest';
import ImageCarousel from './ImageCarousel';
import { useAuth } from "../../contexts/AuthProvider";
import LoginForm from "../Login";


const HomePage: React.FC = () => {
    const [ userIconClicked, setUserIconClicked] = useState<boolean>(false);
    const { user } = useAuth();
    console.log(user);
    
    const handleUserClick = () => {
        setUserIconClicked(true);
    }
    
    return (
        <div>
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