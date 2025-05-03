import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./ProductCarousel.scss"
import ProductItem from "../ProductCard";
import { Product } from "../../interfaces/interfaces";

const products: Product[] = [
  {
    productId: "prod-001",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  },
  {
    productId: "prod-002",
    productName: "8-Bit Arcade Console",
    price: 299.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/console-front.jpg",
      "https://example.com/images/console-back.jpg"
    ],
    type: "Console",
    description:
      "A modern take on the classic 8-bit arcade console, featuring retro-inspired design along with modern connectivity.",
    platform: ["Retro", "Arcade"],
    stockNum: 50,
    genre: ["Action", "Adventure", "Puzzle"]
  }
];

const ProductCarousel: React.FC= () => {
  const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
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
        <h3>Sản phẩm bán chạy</h3>
        <Slider {...settings}>
            {products.map(product => (
                <ProductItem key={product.productId} product={product} />
            ))}
        </Slider>
      </div>
  );
};


export default ProductCarousel;
