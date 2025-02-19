import { useState, useEffect, useContext, ReactNode, createContext } from "react";
import { useAuth } from "./AuthProvider";
import { CartItem } from "../interfaces/interfaces";
import axios from "../apis/axios";
interface CartContextType {
    cart: CartItem[],
}

const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        ( async () => {
            try {
                if (user) {
                    const response = await axios.get("get-cart")
                    setCart(response.data);
                }
            } catch (error) {
                console.log(error);               
            }
        })();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            try {
                const response = await axios.patch("")
            } catch (error) {
                console.log(error);
            }
        }, 500)

    }, [cart]);

    const addCart = async () => {
        
    }

    return (
        <CartContext.Provider value={{ cart }}>
            { children }
        </CartContext.Provider>
    );
}

export default CartProvider;