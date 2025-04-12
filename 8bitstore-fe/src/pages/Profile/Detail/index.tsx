import { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import "./Detail.scss"

const Detail: React.FC = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState({
    address: user?.address,
    
  })

  return (
    <div className="user-detail-container">
      <div className="user-detail">
        <p>Họ tên</p> 
        <p>ádasdassadasdasdasdasdasdd</p>
      </div>
      
      <div className="user-detail">
        <p>Email</p> 
        <p>ádasdasd</p>
      </div>

      <div className="user-detail">
        <p>Số điện thoại</p> 
        <p>ádasdasd</p>
      </div>

      <div className="user-detail">
        <p>Ngày sinh</p> 
        <p>ádasdasd</p>
      </div>
      <div className="address-select-container">
        <p>Địa chỉ</p>
        <div className="address-select">
          <select>
            <option value="">--Tỉnh/Thành phố--</option>
            <option value="Hà Nội">Hà Nội</option>
          </select>
          <select>
            <option value="">--Quận/Huyện--</option>
            <option value="Hà Nội">Hà Nội</option>
          </select>
          <select>
            <option value="">--Phường/Xã--</option>
            <option value="Hà Nội">Hà Nội</option>
          </select>
          <input type="text"></input>
          <button>Cập nhật</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;