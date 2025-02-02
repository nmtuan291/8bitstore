import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ProductPurchase = () => {

    return (
        <div className="w-25 border">
            <div className="d-flex align-items-center justify-content-between p-3">
                <h3>product name</h3>
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <p>publisher</p>
            <p>300000</p>
            <p>Released on: 21211</p>
            <div>
                <ul>

                </ul>
            </div>
            <div>
                <ul>

                </ul>
            </div>
            <div>
                <button className="">ADD TO CART</button>
                <button className="">BUY NOW</button>
            </div>
        </div>
    );
};

export default ProductPurchase;

