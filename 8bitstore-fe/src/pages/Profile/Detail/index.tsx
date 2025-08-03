import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEdit, 
  faSave, 
  faTimes, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faCheck,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import { useGetCurrentUserQuery } from "../../../store/api";
import "./Detail.scss";

interface UserFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

const Detail: React.FC = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when user data loads
  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement update user API call
      console.log("Updating user:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      // TODO: Show success message
    } catch (error) {
      console.error("Error updating user:", error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const userFields = [
    {
      key: 'fullName' as keyof UserFormData,
      label: 'Họ và tên',
      icon: faUser,
      type: 'text',
      placeholder: 'Nhập họ và tên của bạn'
    },
    {
      key: 'email' as keyof UserFormData,
      label: 'Email',
      icon: faEnvelope,
      type: 'email',
      placeholder: 'Nhập địa chỉ email'
    },
    {
      key: 'phoneNumber' as keyof UserFormData,
      label: 'Số điện thoại',
      icon: faPhone,
      type: 'tel',
      placeholder: 'Nhập số điện thoại'
    }
  ];

  if (isLoading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="profile-detail">
      <div className="detail-container">
        {/* Header */}
        <div className="detail-header">
          <div className="header-content">
            <div className="header-info">
              <h2>Thông tin cá nhân</h2>
              <p>Quản lý thông tin tài khoản và cài đặt bảo mật</p>
            </div>
            <div className="header-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="edit-actions">
                  <button 
                    className="cancel-btn" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    Hủy
                  </button>
                  <button 
                    className="save-btn" 
                    onClick={handleSave}
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon icon={isSubmitting ? faCheck : faSave} />
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Information Card */}
        <div className="user-info-card">
          <div className="card-content">
            {userFields.map((field) => (
              <div key={field.key} className="info-field">
                <div className="field-header">
                  <FontAwesomeIcon icon={field.icon} className="field-icon" />
                  <label className="field-label">{field.label}</label>
                </div>
                
                <div className="field-content">
                  {isEditing ? (
                    <div className="input-group">
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className={`form-input ${errors[field.key] ? 'error' : ''}`}
                      />
                      {errors[field.key] && (
                        <div className="error-message">
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                          {errors[field.key]}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="field-value">
                      {formData[field.key] || (
                        <span className="empty-value">Chưa cập nhật</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Stats */}
        <div className="account-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <span className="stat-number">0</span>
                <span className="stat-label">Đơn hàng</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">❤️</div>
              <div className="stat-content">
                <span className="stat-number">0</span>
                <span className="stat-label">Yêu thích</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎮</div>
              <div className="stat-content">
                <span className="stat-number">0</span>
                <span className="stat-label">Sản phẩm đã mua</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <span className="stat-number">0</span>
                <span className="stat-label">Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;