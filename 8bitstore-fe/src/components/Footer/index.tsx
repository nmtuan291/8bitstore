import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faYoutube,
  faTiktok 
} from "@fortawesome/free-brands-svg-icons";
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock,
  faShieldAlt,
  faTruck,
  faUndo,
  faHeadset
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.scss"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="brand-logo">
            <h2>🎮 8BitStore</h2>
            <p className="brand-tagline">Thế giới game số 1 Việt Nam</p>
          </div>
          <p className="brand-description">
            Khám phá thế giới game đỉnh cao với hàng ngàn sản phẩm chất lượng, 
            giá cả hợp lý và dịch vụ tận tâm.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-link">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="YouTube" className="social-link">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" aria-label="TikTok" className="social-link">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="section-title">Liên Kết Nhanh</h3>
          <ul className="footer-links">
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/products">Sản Phẩm</a></li>
            <li><a href="/deals">Khuyến Mãi</a></li>
            <li><a href="/news">Tin Tức</a></li>
            <li><a href="/about">Về Chúng Tôi</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3 className="section-title">Hỗ Trợ Khách Hàng</h3>
          <ul className="footer-links">
            <li><a href="/help">Trung Tâm Trợ Giúp</a></li>
            <li><a href="/shipping">Chính Sách Giao Hàng</a></li>
            <li><a href="/returns">Đổi Trả & Hoàn Tiền</a></li>
            <li><a href="/warranty">Bảo Hành</a></li>
            <li><a href="/privacy">Chính Sách Bảo Mật</a></li>
            <li><a href="/terms">Điều Khoản Sử Dụng</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="section-title">Thông Tin Liên Hệ</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <span>XXXX ấp 4, xã Vĩnh Lộc A, huyện Bình Chánh, TP.HCM</span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <span>Hotline: 1900 8888</span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <span>support@8bitstore.vn</span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faClock} className="contact-icon" />
              <span>8h00 - 21h00 (Thứ 2 - Thứ 7)</span>
            </div>
          </div>

          {/* Service Features */}
          <div className="service-features">
            <div className="feature-item">
              <FontAwesomeIcon icon={faTruck} />
              <span>Giao hàng nhanh</span>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Bảo mật 100%</span>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faUndo} />
              <span>Đổi trả 30 ngày</span>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faHeadset} />
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            <div className="copyright">
              <p>&copy; 2024 8BitStore. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className="payment-methods">
              <span>Phương thức thanh toán:</span>
              <div className="payment-icons">
                <div className="payment-icon">💳</div>
                <div className="payment-icon">🏧</div>
                <div className="payment-icon">📱</div>
                <div className="payment-icon">💰</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;