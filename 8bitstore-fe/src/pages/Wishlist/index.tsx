import { useState } from "react";
import WishlistItem from "./WishlistItem"
import { useWishlist } from "../../contexts/WishlistProvider";
import Modal from "../../components/Modal";
import "./Wishlist.scss";

const Wishlist: React.FC = () => {
	const { wishlistItems, removeItem } = useWishlist();
	const [modal, setModal] = useState<boolean>(false);
	const [deleteProduct, setDeleteProduct] = useState<string>("");

	const handleDeleteModal = (productId: string) => {
		setModal(true);
		setDeleteProduct(productId);
	};

	const handleDeleteItem = () => {
		removeItem(deleteProduct)
		setModal(false);
}

	return (
		<>
			{ modal && <Modal message="Xóa sản phẩm này khỏi wishlist?" confirm={() => handleDeleteItem()} cancel={() => setModal(false)}></Modal>}
			<div className="wishlist-container">
				<div className="wishlist-list">
					{
						wishlistItems.map(item => 
							<WishlistItem 
								productId={item.productId} 
								productName={item.productName} 
								productPrice={item.price} 
								imgSrc={item.imgSrc}
								deleteItem={(productId: string) => handleDeleteModal(productId)}></WishlistItem>)
					}
				</div>
			</div>
		</>
	)
}

export default Wishlist;