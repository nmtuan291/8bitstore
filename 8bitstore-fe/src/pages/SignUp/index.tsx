import { useState, useEffect } from "react";
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
    const navigate = useNavigate();

    const [signUp, { error, isLoading }] = useSignUpMutation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleValidation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(Validation(formData));
        if (!tosCheck) {
            setTosError(true);
        }
    }

    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        handleValidation(event);
        try {
                event.preventDefault();
                await signUp(
                    {
                    userName: formData.userName,
                    Email: formData.email,
                    fullName: formData.fullName,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    phoneNumber: formData.phoneNumber
                }).unwrap();
                setSignUpSuccess(true);
        } catch (error) {
            console.log(error);
        } 
    }
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTosCheck(event.target.checked);
    } 
    
    return (
        <>
            {isLoading && <LoadingOverlay />}
                <div className="form-container">
                    {
                        !signUpSuccess && 
                        <form 
                            className="reg-form"
                            onSubmit={handleSubmit}
                            >
                            <h1 className=''>Đăng ký</h1>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field" 
                                    type="text"
                                    name="userName"
                                    onChange={handleChange}
                                    value={formData.userName}
                                    placeholder="Tên người dùng"
                                />
                                <span>{errors.email}</span>
                            </div>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field" 
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="Email"
                                />
                                <span>{errors.email}</span>
                            </div>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field"
                                    type="text"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={formData.fullName}
                                    placeholder="Họ tên"
                                />
                                <span>{errors.fullName}</span>
                            </div>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field"
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    value={formData.phoneNumber}
                                    placeholder="Số điện thoại"
                                />
                                <span>{errors.address}</span>
                            </div>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    placeholder="Mật khẩu"
                                />
                                <span>{errors.password}</span>
                            </div>
                            <div className="mb-3 w-50">
                                <input
                                    className="input-field"
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    placeholder="Xác nhận mật khẩu"
                                />
                                <span>{errors.confirmPassword}</span>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    onChange={handleCheckboxChange}/>
                                <label style={{ margin: "10px", fontSize:"0.9re", color: `${tosError && "red"}` }}>Đồng ý với điều khoản sử dụng dịch vụ</label>
                            </div>

                            <button className={`customBtn rounded`} type="submit" >Đăng ký</button>
                        </form> 
                    }
 
                    {
                        signUpSuccess && 
                        <div className="signup-success">
                                <h1>Đăng ký thành công!</h1>
                                <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
                                <button 
                                    className="customBtn rounded" 
                                    onClick={() => navigate("/")}
                                >
                                    Về trang chủ
                                </button>
                        </div>
                    }
                </div>
        </>
        
    );
};

export default RegistrationForm;