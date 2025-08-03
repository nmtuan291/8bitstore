import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimes, 
  faUpload,
  faImage,
  faTrash,
  faEye,
  faGamepad,
  faTags,
  faIndustry,
  faBox,
  faWeight,
  faPalette,
  faRulerCombined,
  faHdd,
  faSpinner,
  faCheck,
  faExclamationTriangle,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./AddProductForm.scss";
import { Product } from "../../../../interfaces/interfaces";
import axios from "../../../../apis/axios";

interface FormErrors {
  [key: string]: string;
}

const AddProductForm: React.FC<{ showAddProductForm: () => void }> = ({ showAddProductForm }) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState<boolean>(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>("");
  
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
    stockNum: 0,
    weight: 0,
    color: "",
    dimension: "",
    internalStorage: ""
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

  const validateField = (fieldName: string, value: any): string => {
    switch (fieldName) {
      case 'productName':
        if (!value || value.trim().length < 3) {
          return 'Tên sản phẩm phải có ít nhất 3 ký tự';
        }
        break;
      case 'price':
        if (!value || parseFloat(value) <= 0) {
          return 'Giá phải lớn hơn 0';
        }
        break;
      case 'type':
        if (!value || value.trim().length === 0) {
          return 'Vui lòng nhập loại sản phẩm';
        }
        break;
      case 'manufacturer':
        if (!value || value.trim().length === 0) {
          return 'Vui lòng nhập nhà sản xuất';
        }
        break;
      case 'stockNum':
        if (!value || parseInt(value) < 0) {
          return 'Số lượng không được âm';
        }
        break;
      case 'weight':
        if (!value || parseFloat(value) <= 0) {
          return 'Cân nặng phải lớn hơn 0';
        }
        break;
      case 'description':
        if (!value || value.trim().length < 10) {
          return 'Mô tả phải có ít nhất 10 ký tự';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate required fields
    const requiredFields = ['productName', 'price', 'type', 'manufacturer', 'stockNum', 'weight', 'description'];
    requiredFields.forEach(field => {
      const error = validateField(field, productInfo[field as keyof Product]);
      if (error) newErrors[field] = error;
    });

    // Validate images
    if (images.length === 0) {
      newErrors.images = 'Vui lòng thêm ít nhất 1 hình ảnh';
    }

    // Validate platform and genre
    if (productInfo.platform.length === 0) {
      newErrors.platform = 'Vui lòng chọn ít nhất 1 nền tảng';
    }
    
    if (productInfo.genre.length === 0) {
      newErrors.genre = 'Vui lòng chọn ít nhất 1 thể loại';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [`image_${index}`]: 'Chỉ được chọn file hình ảnh' }));
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [`image_${index}`]: 'Kích thước file không được vượt quá 5MB' }));
        return;
      }

      const fileName: string = productInfo.productId + "_" + file.name;
      const renamedFile = new File([file], fileName, { type: file.type });
      
      const newImages = [...images];
      newImages[index] = renamedFile;
      setImages(newImages);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = e.target?.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`image_${index}`];
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setCurrentStep(1); // Go back to first step if validation fails
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Upload images to Cloudinary
      let urls: string[] = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append("upload_preset", "product_upload");
        formData.append("file", image);
        
        const cloudName: string = "dh7jem3br";
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, 
          {
            method: "POST",
            body: formData
          }
        );

        const data = await response.json();
        urls.push(data.secure_url);
      }
      
      const finalProductInfo = {
        ...productInfo,
        imgUrl: [...productInfo.imgUrl, ...urls]
      };

      // Submit product data
      await axios.post("/api/Product", finalProductInfo);
      
      setSuccessMessage("Sản phẩm đã được thêm thành công!");
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        showAddProductForm();
      }, 2000);
      
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>, fieldName: string) => {
    const value = e.target.value;
    setProductInfo({
      ...productInfo,
      [fieldName]: fieldName === 'price' || fieldName === 'stockNum' || fieldName === 'weight' 
        ? parseFloat(value) || 0 
        : value
    });

    // Clear field error on change
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleGenreChange = (genre: string) => {
    let newGenres: string[];
    if (productInfo.genre.includes(genre)) {
      newGenres = productInfo.genre.filter(g => g !== genre);
    } else {
      newGenres = [...productInfo.genre, genre];
    }

    setProductInfo({
      ...productInfo,
      genre: newGenres
    });

    // Clear error
    if (errors.genre && newGenres.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.genre;
        return newErrors;
      });
    }
  };

  const handlePlatformChange = (platform: string) => {
    let newPlatforms: string[];
    if (productInfo.platform.includes(platform)) {
      newPlatforms = productInfo.platform.filter(p => p !== platform);
    } else {
      newPlatforms = [...productInfo.platform, platform];
    }

    setProductInfo({
      ...productInfo,
      platform: newPlatforms
    });

    // Clear error
    if (errors.platform && newPlatforms.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.platform;
        return newErrors;
      });
    }
  };

  const genreList: string[] = ["Action", "RPG", "Adventure", "Strategy", "Simulation", "Sports", "Racing", "Fighting", "Puzzle"];
  const platformList: string[] = ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "Nintendo Switch", "PC", "Steam Deck"];
  const typeList: string[] = ["Console", "Game", "Accessory", "Controller", "Headset"];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (successMessage) {
    return (
      <div className="form-overlay">
        <div className="success-container">
          <div className="success-content">
            <FontAwesomeIcon icon={faCheck} className="success-icon" />
            <h2>Thành công!</h2>
            <p>{successMessage}</p>
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="form-overlay">
      <div className="product-form-container" ref={ref}>
        {/* Header */}
        <div className="form-header">
          <h2>🎮 Thêm Sản Phẩm Mới</h2>
          <button className="close-btn" onClick={showAddProductForm}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Thông tin cơ bản</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Hình ảnh & Mô tả</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <span>Xác nhận</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h3>📝 Thông tin cơ bản</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="productName">
                    <FontAwesomeIcon icon={faTags} />
                    Tên sản phẩm *
                  </label>
                  <input
                    id="productName"
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    value={productInfo.productName}
                    onChange={e => handleFieldChange(e, "productName")}
                    className={errors.productName ? 'error' : ''}
                  />
                  {errors.productName && <span className="error-message">{errors.productName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="price">
                    💰 Giá (VNĐ) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={productInfo.price === 0 ? "" : productInfo.price}
                    onChange={e => handleFieldChange(e, "price")}
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="type">
                    <FontAwesomeIcon icon={faBox} />
                    Loại sản phẩm *
                  </label>
                  <select
                    id="type"
                    value={productInfo.type}
                    onChange={e => handleFieldChange(e, "type")}
                    className={errors.type ? 'error' : ''}
                  >
                    <option value="">Chọn loại sản phẩm</option>
                    {typeList.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <span className="error-message">{errors.type}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="manufacturer">
                    <FontAwesomeIcon icon={faIndustry} />
                    Nhà sản xuất *
                  </label>
                  <input
                    id="manufacturer"
                    type="text"
                    placeholder="Ví dụ: Sony, Nintendo, Microsoft..."
                    value={productInfo.manufacturer}
                    onChange={e => handleFieldChange(e, "manufacturer")}
                    className={errors.manufacturer ? 'error' : ''}
                  />
                  {errors.manufacturer && <span className="error-message">{errors.manufacturer}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="stockNum">
                    📦 Số lượng *
                  </label>
                  <input
                    id="stockNum"
                    type="number"
                    placeholder="0"
                    value={productInfo.stockNum === 0 ? "" : productInfo.stockNum}
                    onChange={e => handleFieldChange(e, "stockNum")}
                    className={errors.stockNum ? 'error' : ''}
                  />
                  {errors.stockNum && <span className="error-message">{errors.stockNum}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="weight">
                    <FontAwesomeIcon icon={faWeight} />
                    Cân nặng (kg) *
                  </label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={productInfo.weight === 0 ? "" : productInfo.weight}
                    onChange={e => handleFieldChange(e, "weight")}
                    className={errors.weight ? 'error' : ''}
                  />
                  {errors.weight && <span className="error-message">{errors.weight}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="color">
                    <FontAwesomeIcon icon={faPalette} />
                    Màu sắc
                  </label>
                  <input
                    id="color"
                    type="text"
                    placeholder="Ví dụ: Đen, Trắng, Xanh..."
                    value={productInfo.color}
                    onChange={e => handleFieldChange(e, "color")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dimension">
                    <FontAwesomeIcon icon={faRulerCombined} />
                    Kích thước
                  </label>
                  <input
                    id="dimension"
                    type="text"
                    placeholder="Ví dụ: 390 x 104 x 260 mm"
                    value={productInfo.dimension}
                    onChange={e => handleFieldChange(e, "dimension")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="internalStorage">
                    <FontAwesomeIcon icon={faHdd} />
                    Bộ nhớ trong
                  </label>
                  <input
                    id="internalStorage"
                    type="text"
                    placeholder="Ví dụ: 825GB SSD"
                    value={productInfo.internalStorage}
                    onChange={e => handleFieldChange(e, "internalStorage")}
                  />
                </div>
              </div>

              {/* Platform Selection */}
              <div className="checkbox-section">
                <label className="section-label">
                  <FontAwesomeIcon icon={faGamepad} />
                  Nền tảng *
                </label>
                <div className="checkbox-grid">
                  {platformList.map(platform => (
                    <div key={platform} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={platform}
                        checked={productInfo.platform.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                      />
                      <label htmlFor={platform}>{platform}</label>
                    </div>
                  ))}
                </div>
                {errors.platform && <span className="error-message">{errors.platform}</span>}
              </div>

              {/* Genre Selection */}
              <div className="checkbox-section">
                <label className="section-label">
                  <FontAwesomeIcon icon={faTags} />
                  Thể loại *
                </label>
                <div className="checkbox-grid">
                  {genreList.map(genre => (
                    <div key={genre} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={genre}
                        checked={productInfo.genre.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <label htmlFor={genre}>{genre}</label>
                    </div>
                  ))}
                </div>
                {errors.genre && <span className="error-message">{errors.genre}</span>}
              </div>
            </div>
          )}

          {/* Step 2: Images & Description */}
          {currentStep === 2 && (
            <div className="form-step">
              <h3>🖼️ Hình ảnh & Mô tả</h3>
              
              {/* Image Upload */}
              <div className="image-upload-section">
                <label className="section-label">
                  <FontAwesomeIcon icon={faImage} />
                  Hình ảnh sản phẩm * (Tối đa 5 ảnh)
                </label>
                
                <div className="image-upload-grid">
                  {[0, 1, 2, 3, 4].map(index => (
                    <div key={index} className="image-upload-slot">
                      {imagePreviews[index] ? (
                        <div className="image-preview">
                          <img src={imagePreviews[index]} alt={`Preview ${index + 1}`} />
                          <div className="image-overlay">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="remove-btn"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label htmlFor={`image-${index}`} className="upload-placeholder">
                          <FontAwesomeIcon icon={faPlus} />
                          <span>Thêm ảnh {index + 1}</span>
                          <input
                            id={`image-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageChange(e, index)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                      {errors[`image_${index}`] && <span className="error-message">{errors[`image_${index}`]}</span>}
                    </div>
                  ))}
                </div>
                {errors.images && <span className="error-message">{errors.images}</span>}
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">
                  📝 Mô tả sản phẩm *
                </label>
                <textarea
                  id="description"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                  value={productInfo.description}
                  onChange={e => handleFieldChange(e, "description")}
                  className={errors.description ? 'error' : ''}
                  rows={6}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="form-step">
              <h3>✅ Xác nhận thông tin</h3>
              
              <div className="confirmation-grid">
                <div className="info-section">
                  <h4>Thông tin sản phẩm</h4>
                  <div className="info-item">
                    <strong>Tên:</strong> {productInfo.productName}
                  </div>
                  <div className="info-item">
                    <strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productInfo.price)}
                  </div>
                  <div className="info-item">
                    <strong>Loại:</strong> {productInfo.type}
                  </div>
                  <div className="info-item">
                    <strong>Nhà sản xuất:</strong> {productInfo.manufacturer}
                  </div>
                  <div className="info-item">
                    <strong>Số lượng:</strong> {productInfo.stockNum}
                  </div>
                  <div className="info-item">
                    <strong>Nền tảng:</strong> {productInfo.platform.join(', ')}
                  </div>
                  <div className="info-item">
                    <strong>Thể loại:</strong> {productInfo.genre.join(', ')}
                  </div>
                </div>

                <div className="preview-section">
                  <h4>Hình ảnh ({images.length})</h4>
                  <div className="image-preview-grid">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                    ))}
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="error-message submit-error">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.submit}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Quay lại
            </button>
          )}
          
          <div className="action-buttons">
            {currentStep < 3 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Tiếp theo
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-success" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Đang thêm...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheck} />
                    Thêm sản phẩm
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;