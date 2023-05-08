import { useState } from "react";
import InvalidError from "./InvalidError";
import './Login.css';

function Login({onLogin}) {
    const [username, setUsername] = useState(''); 
    const [isValidName, setIsValidName] = useState(true);
    let checkIfValid = () => {
        let isValid = true;
        isValid = isValid && username.trim();
        isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
        if(username === 'dog' || !isValid) {
            setIsValidName(false);
            setUsername('');
            return false;
        }
        onLogin(username);
        setIsValidName(true);
        return true;
    }
    const invalidError =
    (
        <InvalidError/>
    )
    const empty = 
    (
        <div className="empty"/>

    )
    return (
        <div className="login-page">
            <form className="submit-container">
                <input className="login-input" type="text" value={username} 
                onInput={(e) => setUsername(e.target.value)}/>
                <button className="login-btn" type="button" onClick={checkIfValid}>login</button>
            </form>
            {isValidName? empty:invalidError}
        </div>
    );
}

export default Login;