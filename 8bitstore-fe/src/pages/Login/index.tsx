import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "../../../src/apis/axios";
import "./Login.scss"
import { AxiosError } from "axios";

const LoginForm: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const { user, storeUser } = useAuth();
    const navigate = useNavigate();

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
            },
        );  

            if (response.status === 200) {
                const userInfo = response.data;
                storeUser(userInfo)
                console.log("Login successfully");
                navigate("/");
            } 
        } catch (error: any) {
            if (error.response.status >= 400 && error.response.status < 500) {{
                setLoginFailed(true);
            }} else {
                console.log(error.response.data)
            }
        }   
    }
    console.log(loginFailed);

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