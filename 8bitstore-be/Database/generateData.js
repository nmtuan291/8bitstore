use('8bitstore_db');

// Mock data for products
const mockProducts = [
    {
      productName: "Super Gamer Console",
      price: 299.99,
      stockNum: 150,
      manufacturer: "GameTech",
      platform: ["PlayStation", "PC"],
      description: "A high-end gaming console with the best graphics.",
      type: "Console",
      genre: ["Action", "Adventure"],
      imgUrl: "https://example.com/images/super-gamer-console.jpg"
    },
    {
      productName: "Ultra Gaming Laptop",
      price: 1299.99,
      stockNum: 50,
      manufacturer: "TechMaster",
      platform: ["PC"],
      description: "A powerful gaming laptop with top-notch performance.",
      type: "Laptop",
      genre: ["Action", "RPG"],
      imgUrl: "https://example.com/images/ultra-gaming-laptop.jpg"
    },
    {
      productName: "Pro Gaming Headset",
      price: 99.99,
      stockNum: 200,
      manufacturer: "SoundWave",
      platform: ["PlayStation", "PC", "Xbox"],
      description: "A high-quality gaming headset with surround sound.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/pro-gaming-headset.jpg"
    },
    {
      productName: "Elite Gaming Mouse",
      price: 49.99,
      stockNum: 300,
      manufacturer: "ClickMaster",
      platform: ["PC"],
      description: "A precision gaming mouse with customizable buttons.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/elite-gaming-mouse.jpg"
    },
    {
      productName: "Ultimate Gaming Keyboard",
      price: 79.99,
      stockNum: 150,
      manufacturer: "KeyTech",
      platform: ["PC"],
      description: "A mechanical keyboard with RGB lighting and macro keys.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/ultimate-gaming-keyboard.jpg"
    },
    {
      productName: "VR Gaming Set",
      price: 499.99,
      stockNum: 75,
      manufacturer: "VirtualTech",
      platform: ["PC"],
      description: "A complete VR set with headset, controllers, and sensors.",
      type: "VR",
      genre: ["Action", "Adventure", "Simulation"],
      imgUrl: "https://example.com/images/vr-gaming-set.jpg"
    },
    {
      productName: "Racing Wheel",
      price: 199.99,
      stockNum: 100,
      manufacturer: "DriveMaster",
      platform: ["PlayStation", "PC", "Xbox"],
      description: "A realistic racing wheel with force feedback.",
      type: "Accessory",
      genre: ["Racing"],
      imgUrl: "https://example.com/images/racing-wheel.jpg"
    },
    {
      productName: "Gaming Monitor",
      price: 399.99,
      stockNum: 80,
      manufacturer: "ViewTech",
      platform: ["PC"],
      description: "A 27-inch gaming monitor with 144Hz refresh rate.",
      type: "Monitor",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-monitor.jpg"
    },
    {
      productName: "Gaming Chair",
      price: 249.99,
      stockNum: 60,
      manufacturer: "ComfortTech",
      platform: ["All"],
      description: "An ergonomic gaming chair with adjustable features.",
      type: "Furniture",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-chair.jpg"
    },
    {
      productName: "Wireless Gaming Controller",
      price: 59.99,
      stockNum: 250,
      manufacturer: "ControlTech",
      platform: ["PlayStation", "PC", "Xbox"],
      description: "A wireless controller with customizable buttons.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/wireless-gaming-controller.jpg"
    },
    {
      productName: "Gaming Desk",
      price: 199.99,
      stockNum: 40,
      manufacturer: "DeskMaster",
      platform: ["All"],
      description: "A spacious gaming desk with cable management features.",
      type: "Furniture",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-desk.jpg"
  },
  {
      productName: "Streaming Webcam",
      price: 89.99,
      stockNum: 120,
      manufacturer: "StreamTech",
      platform: ["PC"],
      description: "A high-definition webcam for streaming and video calls.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/streaming-webcam.jpg"
  },
  {
      productName: "Gaming Router",
      price: 149.99,
      stockNum: 70,
      manufacturer: "NetMaster",
      platform: ["All"],
      description: "A high-speed router optimized for gaming.",
      type: "Networking",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-router.jpg"
  },
  {
      productName: "Gaming Glasses",
      price: 29.99,
      stockNum: 200,
      manufacturer: "EyeGuard",
      platform: ["All"],
      description: "Glasses designed to reduce eye strain during gaming.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-glasses.jpg"
  },
  {
      productName: "Gaming Backpack",
      price: 79.99,
      stockNum: 90,
      manufacturer: "PackTech",
      platform: ["All"],
      description: "A durable backpack designed for gamers on the go.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-backpack.jpg"
  },
  {
      productName: "Gaming Desk Lamp",
      price: 39.99,
      stockNum: 150,
      manufacturer: "LightMaster",
      platform: ["All"],
      description: "An adjustable desk lamp with RGB lighting.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-desk-lamp.jpg"
  },
  {
      productName: "Gaming Mouse Pad",
      price: 19.99,
      stockNum: 300,
      manufacturer: "PadTech",
      platform: ["PC"],
      description: "A large mouse pad with a smooth surface for gaming.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-mouse-pad.jpg"
  },
  {
      productName: "Gaming Earbuds",
      price: 49.99,
      stockNum: 180,
      manufacturer: "SoundMaster",
      platform: ["All"],
      description: "High-quality earbuds with a built-in microphone.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-earbuds.jpg"
  },
  {
      productName: "Gaming Microphone",
      price: 99.99,
      stockNum: 110,
      manufacturer: "MicTech",
      platform: ["PC"],
      description: "A professional microphone for streaming and recording.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-microphone.jpg"
  },
  {
      productName: "Gaming Console Stand",
      price: 29.99,
      stockNum: 200,
      manufacturer: "StandMaster",
      platform: ["PlayStation", "Xbox"],
      description: "A stand to keep your gaming console cool and organized.",
      type: "Accessory",
      genre: ["All"],
      imgUrl: "https://example.com/images/gaming-console-stand.jpg"
  }
];

// Insert the mock products into the products collection
db.products.insertMany(mockProducts);