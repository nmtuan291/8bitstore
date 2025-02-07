import { useState } from "react";
import Validation from "../../utils/Validation.ts";
import "./RegistrationForm.css";
import { IUserInfo } from "../../interfaces/interfaces.ts";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<IUserInfo>({
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
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTosCheck(event.target.checked);
    } 
    
    return (
        <div className="overlay">
                <form 
                className="reg-form"
                onSubmit={handleValidation}
                >
                    <div className="close-form"> 
                                        <FontAwesomeIcon icon={faX} />
                                    </div>
                <h1 className=''>Đăng ký</h1>
                <div className="mb-3 w-50">
                    <label>Email</label>
                    <input
                        className="input-field" 
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <span>{errors.email}</span>
                </div>
                <div className="mb-3 w-50">
                    <label>Full Name</label>
                    <input
                        className="input-field"
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={formData.fullName}
                    />
                    <span>{errors.fullName}</span>
                </div>
                <div className="mb-3 w-50">
                    <label>Địa chỉ</label>
                    <input
                        className="input-field"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <span>{errors.address}</span>
                </div>
                <div className="mb-3 w-50">
                    <label>Số điện thoại</label>
                    <input
                        className="input-field"
                        type="text"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <span>{errors.address}</span>
                </div>
                <div className="mb-3 w-50">
                    <label>Mật khẩu</label>
                    <input
                        className="input-field"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <span>{errors.password}</span>
                </div>
                <div className="mb-3 w-50">
                    <label>Xác nhận mật khấu</label>
                    <input
                        className="input-field"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                    <span>{errors.confirmPassword}</span>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        onChange={handleCheckboxChange}/>
                    <label style={{ margin: "10px", fontSize:"0.9re", color: `${tosError && "red"}` }}>Checking this box means you agree to our Term of Service</label>
                </div>

                <button className={`customBtn rounded`} type="submit" >Sign Up</button>
            </form> 
        </div>
        
    );
};

export default RegistrationForm;