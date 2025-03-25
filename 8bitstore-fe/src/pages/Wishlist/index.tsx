import WishlistItem from "./WishlistItem"
import { useWishlist } from "../../contexts/WishlistProvider";
import "./Wishlist.scss";

const Wishlist: React.FC = () => {
	const { wishlistItems } = useWishlist();

	return (
		<div className="wishlist-container">
      <div className="wishlist-list">
				{
					wishlistItems.map(item => <WishlistItem productId={item.productId} productName={item.productName} productPrice={item.price} imgSrc={item.imgSrc}></WishlistItem>)
				}
      </div>
        </div>
	)
}

export default Wishlist;