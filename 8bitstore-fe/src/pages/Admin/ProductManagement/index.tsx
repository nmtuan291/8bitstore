import { useEffect, useState } from "react";
import {  Table } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { Product } from "../../../interfaces/interfaces";
import { Outlet } from "react-router-dom";
import axios from "../../../apis/axios";
import AddProductForm from "./AddProductForm";
import "./ProductManage.scss";

const ProductManagement: React.FC = () => {


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