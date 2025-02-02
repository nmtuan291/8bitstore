import { useState } from 'react';
import styles from '../RegistrationForm/RegistrationForm.module.css'

const LoginForm = () => {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    return (
        <form className="d-flex flex-column border align-items-center w-50 h-100 rounded shadow-lg p-3">
            <h1>Welcome to <span className={styles.welcomeHeader}>8BITSTORE</span></h1>
            <div className="mb-3 w-50">
                <label>Email</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="text" 
                    onChange={(e) => setEmailText(e.target.value)}
                    value={emailText} />
            </div>
            <div className="mb-3 w-50">
                <label>Password</label>
                <input
                    className="form-control d-block w-100 fs-6 bg-light rounded border"
                    type="password" 
                    onChange={(e) => setPasswordText(e.target.value)}
                    value={passwordText} />
            </div>
            <span className="login-failed">sadadads</span>
            <div className ="form-check d-flex align-items-center">
                <input className="form-check-input" type="checkbox"/>
                <label className="form-check-label" style={{margin: "10px"}}>Remember password</label>
            </div>

            <button className={`${styles.customBtn} rounded`}>Login</button>
        </form>
    );
};

export default LoginForm;