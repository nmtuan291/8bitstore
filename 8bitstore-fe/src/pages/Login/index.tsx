import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useGetCurrentUserQuery, useLoginMutation } from "../../store/api";
import "./Login.scss"


const LoginForm: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const { data: user, error, isLoading } = useGetCurrentUserQuery();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            console.log("here");
            const response = await login({
                userName: emailText,
                password: passwordText,
            }).unwrap();
            console.log("asdadasd");

            if (response) {
                setLoginFailed(false);
                console.log("Login successfully");
                navigate("/");
            }  else {
                setLoginFailed(true);
            }
            console.log(response);
        } catch (error: any) {
            setLoginFailed(true);

        }
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}
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
                    {loginFailed &&<span className="login-failed">"Tài khoản hoặc mật khẩu không chính xác"</span>}
                    <div className ="form-check d-flex align-items-center">
                        <input className="form-check-input" type="checkbox"/>
                        <label className="form-check-label" style={{margin: "10px"}}>Nhớ mật khẩu</label>
                    </div>

                    <button className={`customBtn rounded`} type="submit">Đăng nhập</button>
                </form>
            </div>
        </>
        
    );
};

export default LoginForm;