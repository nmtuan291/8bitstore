export const items = [
  {
      title: "Bán Chạy Nhất", 
      content: []
  },
  {
      title: "PLAYSTATION", 
      content: [
          {
              category: "Máy PS5",
              url: `productName=${encodeURIComponent("Playstation 5")}`
          },
          {
              category: "Máy PS4",
              url: `productName=${encodeURIComponent("Playstation 4")}`

          },
          {
              category: "Đĩa game",
              url: `productName=${encodeURIComponent("Playstation 5")}&type=${encodeURIComponent("Đĩa game")}`
          },
          {
              category: "Phụ kiện",
              url: `productName=${encodeURIComponent("Playstation 5")}&type=${encodeURIComponent("Phụ kiện")}`
          }
      ],
  },
  {
      title: "XBOX", 
      content: [
          {
              category: "Máy Xbox Series X/S",
              url: `productName=${encodeURIComponent("Xbox")}}`
          },
          {
              category: "Máy Xbox One",
              url: `productName=${encodeURIComponent("Xbox One")}}`
          },
          {
              category: "Đĩa game",
              url: `productName=${encodeURIComponent("Xbox")}&type=${encodeURIComponent("Đĩa game")}`
          },
          {
              category: "Phụ kiện",
              url: `productName=${encodeURIComponent("Xbox")}&type=${encodeURIComponent("Phụ kiện")}`
          }
      ]
  },
  {
      title: "NINTENDO", 
      content: [
          {
              category: "Máy Nintendo Switch 2",
              url: `productName=${encodeURIComponent("Nintendo Switch 2")}`
          },
          {
              category: "Máy Nintendo Switch",
              url: `productName=${encodeURIComponent("Nintendo Switch")}`
          },
          {
              category: "Máy 2DS/3DS",
              url: `productName=${encodeURIComponent("3DS")}&type=${encodeURIComponent("Phụ kiện")}`
          },
          {
              category: "Băng game Nintendo",
              url: `productName=${encodeURIComponent("Nintendo")}&type=${encodeURIComponent("Đĩa game")}`
          },
          {
              category: "Phụ kiện",
              url: `productName=${encodeURIComponent("Nintendo")}&type=${encodeURIComponent("Phụ kiện")}`
          }
      ]
  },
];
