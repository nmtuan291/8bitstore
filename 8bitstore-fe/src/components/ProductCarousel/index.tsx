import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../ProductCard";
import { Product } from "../../interfaces/interfaces";

const productData: Product[] = [
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
    productName: "Pixelated Gamepad",
    price: 59.99,
    manufacturer: "8Bit Gadgets",
    imgUrl: [
      "https://example.com/images/gamepad1.jpg",
      "https://example.com/images/gamepad2.jpg"
    ],
    type: "Accessory",
    description:
      "An ergonomically designed gamepad with a nostalgic pixel art style perfect for retro gaming.",
    platform: ["Retro", "PC"],
    stockNum: 150,
    genre: ["Simulation", "Arcade"]
  },
  {
    productId: "prod-003",
    productName: "Vintage Joystick",
    price: 79.99,
    manufacturer: "ArcadeMasters",
    imgUrl: [
      "https://example.com/images/joystick1.jpg"
    ],
    type: "Accessory",
    description:
      "Experience true nostalgia with this vintage-inspired joystick, ideal for enhancing your gaming setup.",
    platform: ["Retro"],
    stockNum: 85,
    genre: ["Arcade"]
  },
  {
    productId: "prod-004",
    productName: "Retro Handheld Console",
    price: 199.99,
    manufacturer: "RetroTech Inc.",
    imgUrl: [
      "https://example.com/images/handheld-front.jpg",
      "https://example.com/images/handheld-back.jpg"
    ],
    type: "Handheld",
    description:
      "Compact and portable, this handheld console brings back childhood memories with its retro design.",
    platform: ["Portable", "Retro"],
    stockNum: 100,
    genre: ["Action", "Adventure"]
  },
  {
    productId: "prod-005",
    productName: "Classic Arcade Machine",
    price: 499.99,
    manufacturer: "ClassicGames Co.",
    imgUrl: [
      "https://example.com/images/arcade-machine.jpg"
    ],
    type: "Arcade Machine",
    description:
      "Bring the arcade experience home with this authentic classic arcade machine designed for nostalgic fun.",
    platform: ["Arcade"],
    stockNum: 25,
    genre: ["Action", "Fighting"]
  },
  {
    productId: "prod-006",
    productName: "Retro Gaming Keyboard",
    price: 89.99,
    manufacturer: "TypeRetro",
    imgUrl: [
      "https://example.com/images/keyboard1.jpg",
      "https://example.com/images/keyboard2.jpg"
    ],
    type: "Peripheral",
    description:
      "A mechanical keyboard featuring classic keycaps inspired by 8-bit games and retro design.",
    platform: ["PC"],
    stockNum: 200,
    genre: ["Utility", "Gaming"]
  },
  {
    productId: "prod-007",
    productName: "Old School Gaming Mouse",
    price: 39.99,
    manufacturer: "ClickRetro",
    imgUrl: [
      "https://example.com/images/mouse1.jpg"
    ],
    type: "Peripheral",
    description:
      "This gaming mouse combines modern tracking technology with a design reminiscent of retro gaming eras.",
    platform: ["PC"],
    stockNum: 175,
    genre: ["Utility", "Gaming"]
  }
];

const ProductCarousel: React.FC = () => {
  const settings = {
    dots: true,            // Show navigation dots
    infinite: false,        // Loop through the slides infinitely
    adaptiveHeight: true,
    speed: 500,            // Transition speed (ms)
    slidesToShow: 1,       // Number of slides visible at one time
    slidesToScroll: 1,     // Number of slides to scroll at one time
    responsive: [
      {
        breakpoint: 1024, // On devices with width less than 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // On smaller devices less than 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  console.log("asdasd");

  return (
    <div className="carousel-container" style={{ minHeight: "300px" }}>
  <Slider {...settings}>
    {productData.map((product, index) => {
      console.log(product.productName);
      return (
        <div style={{ border: "solid black 1px", padding: "10px" }} key={index}>
          <ProductItem product={product} />
        </div>
      )
    })}
  </Slider>
</div>
  );
};


export default ProductCarousel;
