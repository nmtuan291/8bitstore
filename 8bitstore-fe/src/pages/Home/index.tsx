import React from 'react';
import ConsoleStoreTest from './ConsoleStore/ConsoleStoreTest';
import ImageCarousel from './ImageCarousel';
import ProductCarousel from "../../components/ProductCarousel";
import "./Home.scss";
import dualsenseImge from "../../assets/images/dualsense.jpg";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <ImageCarousel />
            </section>

            {/* Console Store Section */}
            <section className="console-store-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Máy chơi game</h2>
                        <p className="section-subtitle">Khám phá các máy chơi game và phụ kiện mới nhất</p>
                    </div>
                    <ConsoleStoreTest />
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="section-container">
                    <ProductCarousel title="Sản phẩm nổi bật" />
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="promo-banner">
                <div className="promo-content">
                    <div className="promo-text">
                        <h3>Trải nghiệm gaming thế hệ mới</h3>
                        <p>Khám phá trải nghiệm gaming tuyệt vời với tay cầm không dây DualSense</p>
                        <button className="cta-button">Mua ngay</button>
                    </div>
                    <div className="promo-image">
                        <img src={dualsenseImge} alt="Tay cầm DualSense" />
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="bestsellers-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Bán chạy nhất</h2>
                        <p className="section-subtitle">Sản phẩm phổ biến nhất trong cộng đồng game thủ</p>
                    </div>
                    <ProductCarousel title="Sản phẩm bán chạy" />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="new-arrivals-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Hàng mới về</h2>
                        <p className="section-subtitle">Thiết bị và phụ kiện gaming mới nhất</p>
                    </div>
                    <ProductCarousel title="Sản phẩm mới" />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚚</div>
                            <h4>Miễn phí vận chuyển</h4>
                            <p>Giao hàng miễn phí cho đơn hàng trên 1 triệu</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h4>Thanh toán bảo mật</h4>
                            <p>Xử lý thanh toán 100% an toàn</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">↩️</div>
                            <h4>Đổi trả dễ dàng</h4>
                            <p>Đổi trả trong 30 ngày không rắc rối</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎧</div>
                            <h4>Hỗ trợ 24/7</h4>
                            <p>Chăm sóc khách hàng suốt ngày đêm</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="section-container">
                    <div className="newsletter-content">
                        <h3>Cập nhật thông tin</h3>
                        <p>Đăng ký để nhận ưu đãi đặc biệt, cập nhật và tin tức gaming</p>
                        <div className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Nhập địa chỉ email của bạn"
                                className="newsletter-input"
                            />
                            <button className="newsletter-button">Đăng ký</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;