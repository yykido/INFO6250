import { useReducer, useState } from 'react';
import './LoginPage.css';
import services from './services';


function LoginPage({onLogin, LoadingOn, LoadingOff }) {
    const [username, setUsername] = useState('');
    const [invalidMessage, setInvalidMessage] = useState('');
    const [word, setWord] = useState('');
    const [isValidName, setIsValidName] = useState(true);
    const invalidError =(<div>{invalidMessage}</div>);

    return(
        <div className='login-page'>
          <div className='login-title'>Login</div>
          <div className='input-btn-box'>
            <input className='login-input' type="text" placeholder='username' value={username} onInput={(e) => setUsername(e.target.value) }/>
            <button className='login-btn'
            onClick={
              () => {
                LoadingOn();
                services.fetchLogin(username)
                .then(data => {
                  console.log("submit username successfully!");
                  setUsername(data.username);
                  services.displayWord(data.username)
                  .then(data => {
                    setWord(data.storedWord);
                    onLogin(username,data.storedWord);
                    LoadingOff();
                    setUsername('');
                  })
                  .catch(error => {
                    console.error(error);
                    LoadingOff();
                  })
                })
                .catch(error => {
                  setIsValidName(false);
                  setUsername('');
                  console.error(error);
                  if(error.error === "required-username") {
                    setInvalidMessage("Please provide a valid username made up of letters or numbers only")
                  }
                  else {
                    setInvalidMessage("Name such as 'dog' is not allowed");
                  }
                  LoadingOff();
                })
              }
            }>Login</button>
          </div>
          <div className='invalid-error'>{invalidError}</div>
        </div>
    );
}

export default LoginPage;