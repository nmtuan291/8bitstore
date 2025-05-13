import { useState, useEffect, useContext, ReactNode, createContext } from "react";
import { useAuth } from "./AuthProvider";
import { CartItem } from "../interfaces/interfaces";
import axios from "../apis/axios";

interface CartContextType {
    cart: CartItem[],
    updateCart: (cartItem: CartItem) => void,
    deleteCartItems: () => Promise<void>
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
        const fetchCart = async () => {
            try {
                if (user) {
                    console.log("Fetching cart for user");
                    const response = await axios.get("/api/Cart/get-cart");
                    console.log("Cart fetched:", response.data.cartItems);
                    setCart(response.data.cartItems);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);               
            }
        };

        fetchCart();
    }, [user]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                if (cartChange.length > 0) {
                    console.log("Processing cart changes:", cartChange);
                    const requests = cartChange.map(change =>
                    {
                        if (change.quantity > 0 ) {
                            return axios.post("/api/Cart/add-item", {
                                productId: change.productId,
                                quantity: change.quantity
                            })
                        } else {
                           return axios.delete("/api/Cart/delete-item", {
                                params: {
                                    productId: change.productId
                                }
                            })
                        }
                    });
                    await Promise.all(requests);
                    setCartChange([]);
                }
            } catch (error) {
                console.error("Error processing cart changes:", error);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [cartChange]);

    const updateCart = async (cartItem: CartItem) => {
        console.log("Updating cart with item:", cartItem);
        setCart(prev => {
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
        });
        
        setCartChange(prev => {
            const existingChange = prev.find(item => item.productId === cartItem.productId);
            if (existingChange) {
                return prev.map(change => change.productId === cartItem.productId
                    ? {...change, quantity: cartItem.quantity}
                    : change
                );
            }
            return [...prev, {productId: cartItem.productId, quantity: cartItem.quantity}];
        });
    };

    const deleteCartItems = async () => {
        try {
            // First, get all cart items to ensure we have the complete list
            const currentCart = await axios.get("/api/Cart/get-cart");
            const itemsToDelete = currentCart.data.cartItems;
            
            // Delete each item individually and wait for confirmation
            for (const item of itemsToDelete) {
                await axios.delete("/api/Cart/delete-item", {
                    params: {
                        productId: item.productId
                    }
                });
            }
            
            // Clear frontend state
            setCart([]);
            setCartChange([]);
            
            // Double check backend is empty
            // const verifyCart = await axios.get("/api/Cart/get-cart");
            // if (verifyCart.data.cartItems.length > 0) {
            //     console.error("Critical: Backend cart still not empty after deletion. Items remaining:", verifyCart.data.cartItems);
            //     // Force another deletion attempt for remaining items
            //     for (const item of verifyCart.data.cartItems) {
            //         await axios.delete("/api/Cart/delete-item", {
            //             params: {
            //                 productId: item.productId
            //             }
            //         });
            //     }
            // }
        } catch (error) {
            console.error("Failed to delete cart items:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cart, updateCart, deleteCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartProvider;