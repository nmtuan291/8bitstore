import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"

const LoginForm: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");

    return (
        <div className="form-container">
            <form className="login-form">
                {/* <div className="close-form"> 
                    <FontAwesomeIcon icon={faX} />
                </div> */}
                <h1>Đăng nhập</h1>
                <p>Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link></p>
                <div className="mb-3 w-50">
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="text" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailText(e.target.value)}
                        value={emailText} />
                </div>
                <div className="mb-3 w-50">
                    <input
                        className="input-field"
                        placeholder="Mật khẩu"
                        type="password" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordText(e.target.value)}
                        value={passwordText} />
                </div>
                <span className="login-failed">sadadads</span>
                <div className ="form-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label" style={{margin: "10px"}}>Nhớ mật khẩu</label>
                </div>

                <button className={`customBtn rounded`}>Đăng nhập</button>
            </form>
        </div>
        
    );
};

export default LoginForm;