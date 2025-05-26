import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./AddProductForm.scss";
import { Product } from "../../../../interfaces/interfaces";
import axios from "../../../../apis/axios";

const AddProductForm: React.FC<{ showAddProductForm: () => void }> = ({ showAddProductForm }) => {
	const [images, setImages] = useState<File[]>([]);
	const [genreClicked, setGenreClicked] = useState<boolean>(true);
	const [platformClicked, setPlatformClicked] = useState<boolean>(true);
	const [productInfo, setProductInfo] = useState<Product>({
		productId: crypto.randomUUID(),
		productName: "",
		price: 0,
		platform: [],
		type: "",
		genre: [],
		manufacturer: "",
		imgUrl: [],
		description: "",
		stockNum: 0
	});
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const form = document.querySelector(".form-overlay");
		
		const closeForm = (e: Event) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				showAddProductForm();
			}
		}
		form?.addEventListener("click", closeForm);

		return () => form?.removeEventListener("click", closeForm);
	}, []);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const file = e.target.files?.[0];
		
		if (file) {
			const newImages = [...images];

			const fileName: string  = productInfo.productId + "_" + file.name;
			const renamedFile = new File([file], fileName, { type: file.type })
			newImages[index] = renamedFile;
			setImages(newImages);
		}
	};

	const handleSubmit = async () => {
		
		
		let urls: string[] = [];
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
				urls.push(data.secure_url);
			} catch (error) {
				console.log(error);
			}
		}
		
		const finalProductInfo = {
			...productInfo,
			imgUrl: [...productInfo.imgUrl, ...urls]
		};
		setProductInfo(finalProductInfo);

		try {
			(async () => {
				

				await axios.post("/api/Product/add-product", finalProductInfo);
				console.log("product added");
			})();
		} catch (error) {
			console.log(error);
		}
	}

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
		setProductInfo({
			...productInfo,
			[fieldName]: e.target.value
		})
	}

	const handleGenreChange = (e: ChangeEvent<HTMLInputElement>, genre: string) => {
		let newGenres: string[];
		if (e.target.checked) {
			newGenres = [...productInfo.genre, genre];
		} else {
			newGenres = productInfo.genre.filter(gen => gen !== genre)
		}

		setProductInfo({
			...productInfo,
			genre: newGenres
		})
	}

	const handlePlatformChange = (e: ChangeEvent<HTMLInputElement>, platform: string) => {
		let newPlatforms: string[];
		if (e.target.checked) {
			newPlatforms = [...productInfo.platform, platform];
		} else {
			newPlatforms = productInfo.platform.filter(gen => gen !== platform)
		}

		setProductInfo({
			...productInfo,
			platform: newPlatforms
		})
	}


	const genreList: string[] = ["action", "rpg"];
	const platformList: string[] = ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "Nintendo Switch"];
	
	return (
		<div className="form-overlay">
			<div className="product-form-container" ref={ref}>
				<div className="product-form">
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
						<input 
							type="text" 
							placeholder="Tên sản phảm"
							onChange={e => handleFieldChange(e, "productName")}
							value={productInfo.productName}></input>
						<input 
								type="text" 
								placeholder="Giá"
								onChange={e => handleFieldChange(e, "price")}
								value={productInfo.price}></input>	
						<input 
							type="text" 
							placeholder="Loại sản phẩm"
							onChange={e => handleFieldChange(e, "type")}
							value={productInfo.type}></input>	
						<input 
							type="text" 
							placeholder="Nhà sản xuất"
							onChange={e => handleFieldChange(e, "manufacturer")}
							value={productInfo.manufacturer}></input>
						<input 
							type="text" 
							placeholder="Số lượng"
							onChange={e => handleFieldChange(e, "stockNum")}
							value={productInfo.stockNum}></input>
						<input 
							type="text" 
							placeholder="Mô tả"
							onChange={e => handleFieldChange(e, "description")}
							value={productInfo.description}></input>
						<div className="checklist-container">
							<button onClick={() => setGenreClicked(!genreClicked)}>Thể loại</button>
							<div className={`checklist ${!genreClicked && "hide"}`}>
								{
									genreList.map(genre => 
										<div className="genre-checkbox">
											<input type="checkbox" id={genre} onChange={e => handleGenreChange(e, genre)}></input>
											<label htmlFor={genre}>{genre}</label>
										</div>
									)
								}
							</div>
						</div>
						<div className="checklist-container">
							<button onClick={() => setPlatformClicked(!platformClicked)}>Nền tảng</button>
							<div className={`checklist ${!platformClicked && "hide"}`}>
								{
									platformList.map(platform => 
										<div style={{display: "flex", alignItems: "center"}}>
											<input type="checkbox" id={platform} onChange={e => handlePlatformChange(e, platform)}></input>
											<label htmlFor={platform}>{platform}</label>
										</div>
									)
								}
							</div>
						</div>
					</div>
					{/* <input className="description-input" type="text"></input> */}
					<div>
						<textarea
							placeholder="Start typing here..."
							style={{ padding: '10px', fontSize: '16px' }}
						/>
				</div>
				</div>
				<div className="submit-btn-container">
					<button onClick={handleSubmit}>Upload</button>
				</div>
			</div>
		</div>
	)
}

export default AddProductForm;