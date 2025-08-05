import Slider from "react-slick";
import { useGetProductsQuery } from "../../store/api";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./ProductCarousel.scss"
import ProductItem from "../ProductCard";
import { Product } from "../../interfaces/interfaces";

interface ProductCarouselProps {
  title: string
  type: "date" | "score" | "sale"
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, type }) => {
  const { data: products, error, isLoading} = useGetProductsQuery({ 
    page: 1, params: `top=4&${type === "sale" 
      ? "sortByWeeklySales"
      : type === "date"
        ? "sortByDate"
        : "sortByScore" }=1`} )

  const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 2,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 1,
              }
          }
      ]
  };

  return (
      <div className="carousel-container">
        <hr></hr>
        <Slider {...settings}>
            {(products?.products ?? []).map(product => (
                <ProductItem key={product.productId} product={product} />
            ))}
        </Slider>
      </div>
  );
};


export default ProductCarousel;
