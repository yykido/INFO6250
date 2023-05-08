import {useState, useEffect } from 'react';
import './Signup.css';
import services from './services';


function Signup({onLogin, getFoodsData,goToLoginPage,renderEmptyCart,hideAlreadyPick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [invalidMessage, setInvalidMessage] = useState('');
    const invalidError =(<div>{invalidMessage}</div>);

    const submit = function() {
        services.fetchSignup(username,password,email,address)
        .then(data => {
            setUsername(data.username);
            goToLoginPage();
            renderEmptyCart();
            hideAlreadyPick();
            services.displayFoods()
            .then(data => {
                getFoodsData(data.foodItems);
                onLogin(username);
            })
            .catch(error => {
                console.error(error);
            })
        })
        .catch(error => {
            console.error(error);
            if(error.error === "required-username") {
                setInvalidMessage("Please fill out the username");
            }
            else if(error.error === "auth-insufficient") {
                setInvalidMessage("Username such as dog is not allowed");
            }
            else if(error.error === "user-already-exist") {
              setInvalidMessage("Your username is already taken");
            }
            else if(error.error === "need-password"){
              setInvalidMessage("Please fill out the password");
            }
            else if(error.error === "need-email"){
              setInvalidMessage("Please fill out the email");
            }
            else if(error.error === "need-address"){
              setInvalidMessage("Please fill out the address");
            }
        })
    }

    useEffect( 
        () => { 
            if(confirmPassword !== password) {
                setInvalidMessage('password do not match');
            }
            else {
                setInvalidMessage('');
            }
        },
        [confirmPassword] 
    );

    const handleInputChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    return(
        <div className='signup-page'>
          <div className='signup-title'>Cook2Order</div>
          <div className='sigup-input-box'>
              <div className='username'>
                  <input type="text" className="signup-input" placeholder='username' onInput={handleInputChangeUsername} id="" />
              </div>
              <div className='password'>
                  <input type="password" className='signup-input' placeholder='password' onInput={(e) => setPassword(e.target.value)}/>
              </div>
              <div className='confirm-password'>
                  <input type="password" className="signup-input" placeholder='confirm password' onInput={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className='email'>
                  <input type="text" className="signup-input" placeholder='e-mail' onInput={(e) => setEmail(e.target.value)}/>
              </div>
              <div className='address'>
                  <input type="text" className="signup-input" placeholder='address' onInput={(e) => setAddress(e.target.value)}/>
              </div>
              <button className='signup-btn' onClick={submit}>Sign in</button>
              <div className='go-to-login-page' onClick={goToLoginPage}>Log in</div>
          </div>
          <div className='invalid-error'>{invalidError}</div>
        </div>
    );
}

export default Signup;