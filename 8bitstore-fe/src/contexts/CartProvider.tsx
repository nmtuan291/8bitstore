import { useState, useEffect, useContext, ReactNode, createContext } from "react";
import { useAuth } from "./AuthProvider";
import { CartItem } from "../interfaces/interfaces";
import axios from "../apis/axios";

interface CartContextType {
    cart: CartItem[],
    updateCart: (cartItem: CartItem) => void
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
                }
            } catch (error) {
                console.log(error);               
            }
        })();
    }, [user]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const requests = cartChange.map(change =>
                {
                    if (change.quantity > 0 ) {
                        axios.post("/api/Cart/add-item", {
                            productId: change.productId,
                            quantity: change.quantity
                        })
                    } else {
                        axios.delete("/api/Cart/delete-item", {
                            params: {
                                productId: change.productId
                            }
                        })
                    }
                })
                await Promise.all(requests);
                setCartChange([]);
            } catch (error) {
                console.log(error);
            }

        }, 500);
        return () => clearTimeout(timer);
    }, [cartChange]);

    const updateCart = async (cartItem: CartItem) => {
        setCart (prev => {
            const existingItem = prev.find(item => item.productId === cartItem.productId)
            if (existingItem) {
                return prev.map(item => item.productId === cartItem.productId
                    ? {...item, quantity: cartItem.quantity}
                    : item
                ).filter(item => item.quantity > 0);
            } else {
                if (cartItem.quantity > 0) {
                    return [...prev, cartItem];
                }
                
                return prev;
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
        <CartContext.Provider value={{ cart, updateCart }}>
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