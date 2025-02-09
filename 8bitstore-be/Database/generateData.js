use('8bitstore_db');

// Mock data for products
const mockProducts = [
  {
    productName: "BEW asds",
    price: 299.99,
    stockNum: 150,
    manufacturer: "GameTech",
    platform: ["PlayStation", "PC"],
    description: "A high-end gaming console with the best graphics.",
    type: "Console",
    genre: ["Action", "Adventure"],
    imgUrl: "https://example.com/images/super-gamer-console.jpg"
  },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // {
  //   productName: "Super Gamer Console",
  //   price: 299.99,
  //   stockNum: 150,
  //   manufacturer: "GameTech",
  //   platform: ["PlayStation", "PC"],
  //   description: "A high-end gaming console with the best graphics.",
  //   type: "Console",
  //   genre: ["Action", "Adventure"],
  //   imgUrl: "https://example.com/images/super-gamer-console.jpg"
  // },
  // {
  //   productName: "Speed Racer Pro",
  //   price: 49.99,
  //   stockNum: 120,
  //   manufacturer: "SpeedTech",
  //   platform: ["PC", "Xbox"],
  //   description: "The ultimate racing game for all platforms.",
  //   type: "Game",
  //   genre: ["Racing"],
  //   imgUrl: "https://example.com/images/speed-racer-pro.jpg"
  // },
  // Add more products here...
];

// Insert the mock products into the products collection
db.products.insertMany(mockProducts);