import {useState } from 'react';
import './LoginPage.css';
import services from './services';


function LoginPage({onLogin, LoadingOn, LoadingOff,goToSignupPage,getFoodsData,renderMyCart }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidMessage, setInvalidMessage] = useState('');
    const invalidError =(<div>{invalidMessage}</div>);
    const login = function() {
      services.fetchLogin(username,password)
      .then(data => {
        setUsername(data.userInfo.username);
        getFoodsData(data.foodItems); // get data from server and store in the frontend
        onLogin(data.userInfo.username); // go to the marketing page
        renderMyCart(data.myCart);
      })
      .catch(error => {

        setUsername('');
        setPassword('');
        console.error(error);
        if(error.error === "username-not-found") {
          setInvalidMessage("username not found")
        }
        else {
          setInvalidMessage("password incorrect");
        }
      })
    }

    return(
        <div className='login-page'>
          <div className='login-title'>Cook2Order</div>
          <div className='input-btn-box'>
            <input className='login-input' type="text" placeholder='username' value={username} onInput={(e) => setUsername(e.target.value) }/>
            <input className='login-pswd-input' type="password" placeholder='password' value={password} onInput={(e) => setPassword(e.target.value) }/>
            <button className='login-btn' onClick={login}>Log in</button>
            <div className='go-to-signup' onClick={goToSignupPage}>sign in</div>
            <div className='invalid-error'>{invalidError}</div>
          </div>
        </div>
    );
}

export default LoginPage;