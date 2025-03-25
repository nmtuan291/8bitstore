import { ChangeEvent, useState } from "react";
import "./AddProductForm.scss";

const AddProductForm: React.FC = () => {
	const [images, setImages] = useState<File[]>([]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const file = e.target.files?.[0];
		
		if (file) {
			const newImages = [...images];
			newImages[index] = file;
			setImages(newImages);
		}
	};

	const handleSubmit = async () => {
		const uploadImageUrl: string[] = [];

		for (const image of images) {
			const formData = new FormData();
			formData.append("upload_preset", "product_upload");
			formData.append("file", image);
			try {
				const cloudName: string = "dh7jem3br";
				const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, 
					{
						method: "POST",
						body: formData
					}
				);

				const data = await response.json();
				console.log(data.secure_url);
			} catch (error) {
				console.log(error);
			}
		}
	}
	
	return (
		<div className="form-overlay">
			<div className="product-form-container">
				<div className="img-upload">
					<p>Chọn ảnh(tối đa 5)</p>
					{
						[0, 1, 2, 3, 4].map(index => 
							<input 
								type="file" 
								style={{ padding: '10px' }}
								onChange={e => handleImageChange(e, index)}
							/>
						)
					}
				</div>
				<div className="product-info">
					<input type="text" placeholder="Tên sản phảm"></input>
					<input type="text" placeholder="Thể loại"></input>
					<input type="text" placeholder="Nhà sản xuất"></input>
					<input type="text" placeholder="Số lượng"></input>
				</div>
				<button onClick={handleSubmit}>Upload</button>
			</div>
		</div>
	)
}

export default AddProductForm;