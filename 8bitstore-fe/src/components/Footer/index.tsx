import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss"

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-icon">
        <FontAwesomeIcon icon={faFacebook} style={{fontSize: "40px"}}/>
        <FontAwesomeIcon icon={faGoogle} style={{fontSize: "40px"}}/>
        <FontAwesomeIcon icon={faInstagram} style={{fontSize: "40px"}}/>
      </div>
      <div className="footer-info">
        <p>Địa chỉ: XXXX ấp 4, xã Vĩnh Lộc A, huyện Bình Chánh, thành phồ Hồ Chí Minh</p>
        <p>Giờ hoạt động: 8h-21h từ thứ 2 đên thứ 7</p>
        <p>Số điện thoại: 012343546456</p>
      </div>
    </div>
  )
}

export default Footer;