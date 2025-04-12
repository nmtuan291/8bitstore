import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Product } from "../../interfaces/interfaces";
import axios from "../../apis/axios";
import AddProductForm from "./AddProductForm";

const ProductManagement: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
			
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("/api/Product/get-products");
				if (response.status === 200) {
					setProducts(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchProducts();
	}, []);

	return (
		<div>
			<div style={{display: ""}}>
				<AddProductForm></AddProductForm>
			</div>
			<Table className="" striped bordered hover size="sm">
				<thead>
					<tr>
						<th>ProductId</th>
						<th>Product Name</th>
						<th>Stock</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map(product => 
						<tr>
							<th>
								<p>{product.productId}</p>
							</th>
							<th>
								<p>{product.productName}</p>
							</th>
							<th>
								<p>{product.stockNum}</p>
							</th>
							<th style={{display: "flex", gap:"10px"}}>
								<button>Delete</button>
								<button>Modify</button>
								<button>Description</button>
							</th>
						</tr>)
					}
				</tbody>
			</Table>
			<button>Add product</button>
			<input 
				type="file" 
				style={{ padding: '10px' }}
			/>
		</div>
	)
}

export default ProductManagement;