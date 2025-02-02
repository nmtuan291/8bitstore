import { useState } from 'react';
import Validation from './Validation';
import styles from './RegistrationForm.module.css'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
        fullName: "",
    });
    const [tosCheck, setTosCheck] = useState(false);
    const [errors, setErrors] = useState({})
    const [tosError, setTosError] = useState(false);

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleValidation = (event) => {
        event.preventDefault();
        setErrors(Validation(formData));
        if (!tosCheck) {
            setTosError(true);
        }
    }
    
    const handleCheckboxChange = (event) => {
        setTosCheck(event.target.checked);
    } 
    
    return (
        <form 
            className="d-flex flex-column border align-items-center w-50 h-100 rounded shadow-lg p-3" 
            onSubmit={handleValidation}
            >
            <h1 className=''>Welcome to 8BITSTORE</h1>
            <div className='mb-3 w-50' >
                <label>Email</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border" 
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <span>{errors.email}</span>
            </div>
            <div className='mb-3 w-50'>
                <label>Full Name</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={formData.fullName}
                />
                <span>{errors.fullName}</span>
            </div>
            <div className='mb-3 w-50'>
                <label>Address</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                />
                <span>{errors.address}</span>
            </div>
            <div className='mb-3 w-50'>
                <label>Phone number</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="text"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={formData.address}
                />
                <span>{errors.address}</span>
            </div>
            <div className='mb-3 w-50'>
                <label>Password</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <span>{errors.password}</span>
            </div>
            <div className='mb-3 w-50'>
                <label>Confirm Password</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
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

            <button className={`${styles.customBtn} rounded`} type="submit" >Sign Up</button>
        </form>
    );
};

export default RegistrationForm;