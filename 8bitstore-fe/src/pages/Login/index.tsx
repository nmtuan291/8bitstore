import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useGetCurrentUserQuery, useLoginMutation } from "../../store/api";
import "./Login.scss"

const LoginForm: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const { data: user, error, isLoading } = useGetCurrentUserQuery();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!emailText.trim() || !passwordText.trim()) {
            setLoginFailed(true);
            return;
        }

        setIsSubmitting(true);
        setLoginFailed(false);

        try {
            await login({
                userName: emailText.trim(),
                password: passwordText,
            }).unwrap();

            setLoginFailed(false);
            navigate("/");
        } catch (error: any) {
            setLoginFailed(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleInputChange = (field: 'email' | 'password', value: string) => {
        if (loginFailed) {
            setLoginFailed(false);
        }
        
        if (field === 'email') {
            setEmailText(value);
        } else {
            setPasswordText(value);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="form-container">    
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>
                    
                    <p className="signup-link">
                        Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
                    </p>
                    
                    <div className={`input-group ${loginFailed ? 'error' : ''}`}>
                        <input
                            placeholder="Tên đăng nhập"
                            className="input-field"
                            type="text" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleInputChange('email', e.target.value)
                            }
                            value={emailText}
                            disabled={isSubmitting}
                            autoComplete="username"
                        />
                    </div>
                    
                    <div className={`input-group ${loginFailed ? 'error' : ''}`}>
                        <input
                            className="input-field"
                            placeholder="Mật khẩu"
                            type="password" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleInputChange('password', e.target.value)
                            }
                            value={passwordText}
                            disabled={isSubmitting}
                            autoComplete="current-password"
                        />
                    </div>
                    
                    {loginFailed && (
                        <div className="error-message">
                            Tài khoản hoặc mật khẩu không chính xác
                        </div>
                    )}
                    
                    <div className="remember-me">
                        <input 
                            className="form-check-input" 
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isSubmitting}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Nhớ mật khẩu
                        </label>
                    </div>

                    <button 
                        className="login-button" 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;