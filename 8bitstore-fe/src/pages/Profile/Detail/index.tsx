import { useState } from "react";
import { useGetCurrentUserQuery } from "../../../store/api";
import "./Detail.scss"

const Detail: React.FC = () => {
  const { data: user } = useGetCurrentUserQuery();
  const [address, setAddress] = useState({
    address: user?.address,
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="user-detail-container">
        <h2 style={{ color: '#946CBC', fontWeight: 700, marginBottom: 16, textAlign: 'center', fontSize: '1.5rem' }}>Thông tin cá nhân</h2>
        <div className="user-detail">
          <p>Họ tên</p> 
          <p>{user?.fullName || <span style={{ color: '#85BDB6' }}>Chưa cập nhật</span>}</p>
        </div>
        <div className="user-detail">
          <p>Email</p> 
          <p>{user?.email || <span style={{ color: '#85BDB6' }}>Chưa cập nhật</span>}</p>
        </div>
        <div className="user-detail">
          <p>Số điện thoại</p> 
          <p>{user?.phoneNumber || <span style={{ color: '#85BDB6' }}>Chưa cập nhật</span>}</p>
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
            <input type="text" placeholder="Số nhà, tên đường..." />
            <button>Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;