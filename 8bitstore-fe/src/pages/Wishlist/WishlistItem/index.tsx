import { useWishlist } from "../../../contexts/WishlistProvider";
import "./WishlistItem.scss";

interface WishlistItemProps {
    productId: string
    imgSrc: string,
    productName: string,
    productPrice: number,
};

const WishlistItem: React.FC<WishlistItemProps> = ({
	productId,
	imgSrc,
	productName,
	productPrice
}) => {
	const { removeItem } = useWishlist();

	return (
		<div className="wishlist-item-container">
			<div className="product-image-section">
				<img className="product-cart-img" src={imgSrc}></img>
				<p>{productName}</p>
			</div>
			<p className="price">{productPrice}</p>
			<p 
				className="delete-product"
				onClick={() => removeItem(productId)}
			>
				Xóa
			</p>
		</div>
	)
}

export default WishlistItem;