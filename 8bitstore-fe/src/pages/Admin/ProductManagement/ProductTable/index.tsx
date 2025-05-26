import { useState, useEffect } from "react";
import { Table } from "react-bootstrap"
import { Product } from "../../../../interfaces/interfaces";
import axios from "../../../../apis/axios";
import AddProductForm from "../AddProductForm";
import "./ProductTable.scss";

const ProductTable: React.FC = () =>  {
  const [products, setProducts] = useState<Product[]>([]);
	const [showAddProductForm, setShowAddProductForm] = useState<boolean>(true);


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
    <>
			{showAddProductForm && <AddProductForm showAddProductForm={() => setShowAddProductForm(false)} />}
      <Table className="product-table">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productId}>
              <td>
                <p>{product.productId}</p>
              </td>
              <td>
                <p>{product.productName}</p>
              </td>
              <td>
                <p>{product.stockNum}</p>
              </td>
              <td>
                <button>Delete</button>
                <button>Modify</button>
                <button>Description</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
			<button onClick={() => setShowAddProductForm(true)}>Add product</button>
    </>
  )
}

export default ProductTable;