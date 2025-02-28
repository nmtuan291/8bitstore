import { useState, useEffect, useContext, ReactNode, createContext } from "react";
import { useAuth } from "./AuthProvider";
import { CartItem } from "../interfaces/interfaces";
import axios from "../apis/axios";
interface CartContextType {
    cart: CartItem[],
    addCart: (cartItem: CartItem) => void
}

interface CartChangesType {
    productId: string,
    quantity: number
}

const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useAuth();
    const [cartChange, setCartChange] = useState<CartChangesType[]>([]);

    useEffect(() => {
        ( async () => {
            try {
                if (user) {
                    const response = await axios.get("/api/Cart/get-cart")
                    setCart(response.data.cartItems);
                    console.log(response.data.cartItems);
                }
            } catch (error) {
                console.log(error);               
            }
        })();
    }, [user]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                for (const change of cartChange) {
                    await axios.post("/api/Cart/add-item", {
                        productId: change.productId,
                        quantity: change.quantity
                    })
                }

                setCartChange([]);
            } catch (error) {
                console.log(error);
            }

        }, 500);
        return () => clearTimeout(timer);
    }, [cartChange]);

    const addCart = async (cartItem: CartItem) => {
        setCart (prev => {
            const existingItem = prev.find(item => item.productId === cartItem.productId)
            if (existingItem) {
                return prev.map(item => item.productId === cartItem.productId
                    ? {...item, quantity: cartItem.quantity}
                    : item
                );
            } else {
                return [...prev, cartItem];
            }

        })
        
        setCartChange(prev => {
            const existingChange = prev.find(item => item.productId === cartItem.productId);
            if (existingChange) {
                return prev.map(change => change.productId === cartItem.productId
                    ? {...change, quantity: cartItem.quantity}
                    : change
                );
            }
            return [...prev, {productId: cartItem.productId, quantity: cartItem.quantity}];
        })
    }

    return (
        <CartContext.Provider value={{ cart, addCart }}>
            { children }
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw("useCart must be used in a CartProvider");
    }

    return context;
}

export default CartProvider;