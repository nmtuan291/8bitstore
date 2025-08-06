import { useState } from "react";
import Validation from "../../utils/Validation.ts";
import "./SignUp.scss";
import { User } from "../../interfaces/interfaces.ts";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useSignUpMutation } from "../../store/api/index.ts";

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<User>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
        fullName: "",
    });
    const [tosCheck, setTosCheck] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [tosError, setTosError] = useState<boolean>(false);
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
        // Clear error when user starts typing
        if (errors[event.target.name]) {
            setErrors(prev => ({ ...prev, [event.target.name]: "" }));
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTosCheck(event.target.checked);
        setTosError(false);
    };

    const handleValidation = () => {
        const validationErrors = Validation(formData);
        setErrors(validationErrors);
        if (!tosCheck) {
            setTosError(true);
        }
        return Object.keys(validationErrors).length === 0 && tosCheck;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!handleValidation()) return;
        
        setIsSubmitting(true);
        try {
            await signUp({
                userName: formData.userName,
                Email: formData.email,
                fullName: formData.fullName,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phoneNumber: formData.phoneNumber
            }).unwrap();
            setSignUpSuccess(true);
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {(isLoading || isSubmitting) && <LoadingOverlay />}
            <div className="form-container">
                {!signUpSuccess && (
                    <form className="reg-form" onSubmit={handleSubmit}>
                        <h1>Đăng ký</h1>
                        
                        <div className={`input-group ${errors.userName ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="text"
                                name="userName"
                                onChange={handleChange}
                                value={formData.userName}
                                placeholder="Tên người dùng"
                                disabled={isSubmitting}
                                autoComplete="username"
                            />
                            {errors.userName && <div className="error-message">{errors.userName}</div>}
                        </div>
                        
                        <div className={`input-group ${errors.email ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="Email"
                                disabled={isSubmitting}
                                autoComplete="email"
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        
                        <div className={`input-group ${errors.fullName ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                value={formData.fullName}
                                placeholder="Họ tên"
                                disabled={isSubmitting}
                                autoComplete="name"
                            />
                            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                        </div>
                        
                        <div className={`input-group ${errors.phoneNumber ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="tel"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={formData.phoneNumber}
                                placeholder="Số điện thoại"
                                disabled={isSubmitting}
                                autoComplete="tel"
                            />
                            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                        </div>
                        
                        <div className={`input-group ${errors.password ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="Mật khẩu"
                                disabled={isSubmitting}
                                autoComplete="new-password"
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        
                        <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
                            <input
                                className="input-field"
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                placeholder="Xác nhận mật khẩu"
                                disabled={isSubmitting}
                                autoComplete="new-password"
                            />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                        
                        <div className={`tos-group ${tosError ? 'error' : ''}`}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="tosCheck"
                                checked={tosCheck}
                                onChange={handleCheckboxChange}
                                disabled={isSubmitting}
                            />
                            <label className="form-check-label" htmlFor="tosCheck">
                                Đồng ý với điều khoản sử dụng dịch vụ
                            </label>
                        </div>
                        
                        {tosError && (
                            <div className="error-message">
                                Bạn phải đồng ý với điều khoản sử dụng dịch vụ
                            </div>
                        )}
                        
                        <button
                            className="signup-button"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>
                    </form>
                )}
                
                {signUpSuccess && (
                    <div className="signup-success">
                        <h1>Đăng ký thành công!</h1>
                        <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
                        <button
                            className="customBtn"
                            onClick={() => navigate("/")}
                        >
                            Về trang chủ
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default RegistrationForm;