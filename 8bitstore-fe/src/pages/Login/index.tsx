import { useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthProvider";
import axios from "../../../src/apis/axios";
import "./Login.scss"

const LoginForm: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const { user, setUser } = useAuth();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post("/login", {
                email: emailText,
                password: passwordText,
                sessionCookie: false
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

            if (response.status === 200) {
                const userInfo = response.data;
                setUser(userInfo)
                console.log("Login successfully");
            } else {
                setLoginFailed(true);
            }

        } catch (error) {
            
        }
    }

    return (
        <div className="form-container">    
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
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
                <span className="login-failed">{loginFailed && "Tài khoản hoặc mật khảu không chính xác"}</span>
                <div className ="form-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label" style={{margin: "10px"}}>Nhớ mật khẩu</label>
                </div>

                <button className={`customBtn rounded`} type="submit">Đăng nhập</button>
            </form>
        </div>
        
    );
};

export default LoginForm;