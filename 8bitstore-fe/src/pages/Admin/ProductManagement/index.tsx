import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../../store/api";
import "./ProductManage.scss";

const ProductManagement: React.FC = () => {
	const navigate = useNavigate();
	const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery();

	if (isUserLoading) return null;

	if (!user)
		navigate("/login") 

	return (
		<div  className="product-management-container">
			<div className="manage-menu-container">
				<div className="manage-menu">
					<ul>
						<NavLink to="/manage/product" className="nav-link top">Quản lý sản phẩm</NavLink>
						<NavLink to="/manage/order" className="nav-link">Quản lý đơn hàng</NavLink>
						<NavLink to="/profile/change-pwd" className="nav-link bottom">Chức năng đang phát triển</NavLink>
					</ul>
				</div>
			</div>
			<div className="product-management-content">
				<Outlet />
			</div>
		</div>
	)
}

export default ProductManagement;