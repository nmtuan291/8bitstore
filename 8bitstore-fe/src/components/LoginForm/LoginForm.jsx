import { useState } from 'react';
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from '../RegistrationForm/RegistrationForm.module.css'
import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginForm = () => {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    return (
        <div className='overlay'>
            <form className="login-form">
                <div className='close-form'> 
                    <FontAwesomeIcon icon={faX} />
                </div>
                <h1>Đăng nhập</h1>
                <p>Chưa có tài khoản? <a href='/'>Đăng ký ngay</a></p>
                <div className="mb-3 w-50">
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="text" 
                        onChange={(e) => setEmailText(e.target.value)}
                        value={emailText} />
                </div>
                <div className="mb-3 w-50">
                    <input
                        className="input-field"
                        placeholder="Mật khẩu"
                        type="password" 
                        onChange={(e) => setPasswordText(e.target.value)}
                        value={passwordText} />
                </div>
                <span className="login-failed">sadadads</span>
                <div className ="form-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label" style={{margin: "10px"}}>Nhớ mật khẩu</label>
                </div>

                <button className={`${styles.customBtn} rounded`}>Đăng nhập</button>
            </form>
        </div>
        
    );
};

export default LoginForm;