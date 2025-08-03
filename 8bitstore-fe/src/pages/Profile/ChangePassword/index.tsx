import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faEyeSlash, 
  faLock, 
  faCheck, 
  faTimes, 
  faExclamationTriangle,
  faShieldAlt,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import "./ChangePassword.scss";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

const ChangePassword: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false
  });

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1: return "Rất yếu";
      case 2: return "Yếu";
      case 3: return "Trung bình";
      case 4: return "Mạnh";
      case 5: return "Rất mạnh";
      default: return "";
    }
  };

  const getPasswordStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1: return "#dc3545";
      case 2: return "#fd7e14";
      case 3: return "#ffc107";
      case 4: return "#20c997";
      case 5: return "#28a745";
      default: return "#e9ecef";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (passwordData.newPassword === passwordData.currentPassword) {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement change password API call
      console.log("Changing password:", passwordData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Show success message
      alert("Đổi mật khẩu thành công!");
      
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Error changing password:", error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  const passwordRequirements = [
    { text: "Ít nhất 8 ký tự", met: passwordData.newPassword.length >= 8 },
    { text: "Có chữ thường", met: /[a-z]/.test(passwordData.newPassword) },
    { text: "Có chữ hoa", met: /[A-Z]/.test(passwordData.newPassword) },
    { text: "Có số", met: /[0-9]/.test(passwordData.newPassword) },
    { text: "Có ký tự đặc biệt", met: /[^A-Za-z0-9]/.test(passwordData.newPassword) }
  ];

  return (
    <div className="change-password-page">
      <div className="password-container">
        {/* Header */}
        <div className="password-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h2>Đổi mật khẩu</h2>
          <p>Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="password-form">
          {/* Current Password */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faKey} />
              Mật khẩu hiện tại
            </label>
            <div className="password-input-group">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className={`form-input ${errors.currentPassword ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("current")}
              >
                <FontAwesomeIcon icon={showPasswords.current ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.currentPassword && (
              <div className="error-message">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.currentPassword}
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faLock} />
              Mật khẩu mới
            </label>
            <div className="password-input-group">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Nhập mật khẩu mới"
                className={`form-input ${errors.newPassword ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("new")}
              >
                <FontAwesomeIcon icon={showPasswords.new ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.newPassword && (
              <div className="error-message">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.newPassword}
              </div>
            )}

            {/* Password Strength */}
            {passwordData.newPassword && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(passwordStrength)
                    }}
                  />
                </div>
                <div className="strength-label">
                  Độ mạnh: <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                    {getPasswordStrengthLabel(passwordStrength)}
                  </span>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {passwordData.newPassword && (
              <div className="password-requirements">
                <p className="requirements-title">Yêu cầu mật khẩu:</p>
                <ul className="requirements-list">
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className={`requirement ${req.met ? 'met' : 'unmet'}`}>
                      <FontAwesomeIcon icon={req.met ? faCheck : faTimes} />
                      {req.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faLock} />
              Xác nhận mật khẩu mới
            </label>
            <div className="password-input-group">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                <FontAwesomeIcon icon={showPasswords.confirm ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Đang cập nhật...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faShieldAlt} />
                Cập nhật mật khẩu
              </>
            )}
          </button>
        </form>

        {/* Security Tips */}
        <div className="security-tips">
          <h4>💡 Lời khuyên bảo mật</h4>
          <ul>
            <li>Sử dụng mật khẩu duy nhất cho mỗi tài khoản</li>
            <li>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
            <li>Không chia sẻ mật khẩu với bất kỳ ai</li>
            <li>Thay đổi mật khẩu định kỳ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;