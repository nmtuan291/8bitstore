import { useState } from "react";
import "./ProductFilter.scss";

const ProductFilter: React.FC = () => {
  const [filter, setFilter] = useState({
    type: null,
    manufacturer: null,
    genres: [],
    minPrice: 0,
    maxPrice: 0
  });

  const types = ["Máy chơi game", "Phụ kiện", "Đĩa game"];
  const manufacturers = ["Sony", "Microsoft", "Nintendo"];
  const genres = [
    "Hành động",
    "Nhập vai",
    "Casual",
    "FPS",
    "Thể thao",
    "Kinh dị",
    "Sinh tồn",
  ];

  // const handleCheckboxChange = (category: "type" | "manufacturer" | "genres", value: string | number) => {
  //   setFilter(prev => {
  //     const current = prev[category]
  //   })
  // }

  const handleFilterClick = () => {

  }

  const renderCheckboxList = (items: string[]) =>
    items.map((item) => (
      <li key={item}>
        <input type="checkbox" id={item} />
        <label htmlFor={item}>{item}</label>
      </li>
    ));

   return (
    <div className="product-filter-container">
      <div>
        <h5>Loại sản phẩm</h5>
        <ul>{renderCheckboxList(types)}</ul>
      </div>

      <div>
        <h5>Hãng sản xuất</h5>
        <ul>{renderCheckboxList(manufacturers)}</ul>
      </div>

      <div>
        <h5>Thể loại</h5>
        <ul>{renderCheckboxList(genres)}</ul>
      </div>

      <div className="price-filter">
        <h5>Lọc theo giá</h5>
        <input type="number" placeholder="Giá tối thiểu" />
        <label>-</label>
        <input type="number" placeholder="Giá tối đa" />
      </div>

      <div className="filter-btn">
        <button onClick={handleFilterClick}>Lọc sản phẩm</button>
      </div>
    </div>
  );
}

export default ProductFilter;