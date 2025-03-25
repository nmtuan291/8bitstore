import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import axios from "../apis/axios";

interface WishlistItem {
	productId: string,
	productName: string,
	imgSrc: string[],
	price: number
}

interface WishlistContextType {
	wishlistItems: WishlistItem[],
	addItem: (productId: string, productName: string, imgSrc: string[], price: number) => void,
	removeItem: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const WishlistProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await axios.get("/api/Wishlist/get-wishlist");
				setWishlistItems(() => {
					console.log(response.data);

					return response.data ? response.data.wishlistItems : [];
				});
			} catch (error) {
				console.log(error);
			}
		}
		if (user) {
			fetchWishlist();
		}
	}, [user])
	
	const addItem = async (productId: string, productName: string, imgSrc: string[], price: number) => {
		const existingItem = wishlistItems.find(item => item.productId === productId);
		
		if (!existingItem) {
			try {
				const response = await axios.post("/api/Wishlist/add-item", `"${productId}"`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
			
				if (response.status === 200) {
					setWishlistItems(prev => {
						const a = [
							...prev, {
								productId: productId,
								productName: productName,
								imgSrc: imgSrc,
								price: price
							}
						]
						console.log(a)
						return a;
					})
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const removeItem = async (productId: string) => {
		const existingItem = wishlistItems.find(item => item.productId === productId);
		try {
			if (existingItem) {
				const response = await axios.delete("/api/Wishlist/remove-item", {
					params: {
						productId: productId
					}
				});
				if (response.status === 200) {
					setWishlistItems(prev => prev.filter(item => item.productId !== productId))
				}
			}
		} catch (error) {
			console.log(error);
		}
	} 

	return (
		<WishlistContext.Provider value={ { wishlistItems, addItem, removeItem } }>
			{ children }
		</WishlistContext.Provider>
	)
}

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (!context) {
		throw("useWishlist must be used in WishlistProvider");
	}

	return context;
}

export default WishlistProvider;

