import './App.css';
import './loading.css';

import LoginPage from './LoginPage';
import StoreWordPage from './StoreWordPage';
import {useState, useEffect} from 'react';
import services from './services';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [word, setWord] = useState('');

  let onLogin = (username,word) => {
    setUsername(username);
    setWord(word);
    setIsLoggedIn(true);
  }

  let LoadingOn = () => {
    setIsLoading(true);

  }
  let LoadingOff = () => {
    setIsLoading(false);
  }

  let onWord = (word) => {
    setWord(word)
  }

  const onLogout = () => setIsLoggedIn(false);

  useEffect( 
    () => { 
      setIsLoading(true);
      services.checkIfLogin()
      .then( data => { 
        setUsername(data.username);
        services.displayWord(data.username)
        .then( data => {
          setWord(data.storedWord);
        })
        .catch(error => {
          setUsername('');
          setWord('');
          setIsLoggedIn(false);
        });
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch( err => {
        console.error("remain in the login page");
        setUsername('');
        setIsLoggedIn(false);
        setIsLoading(false);
      }); 
    },
    [] 
  );

  const content = (<StoreWordPage username = {username} onLogout = {onLogout} word={word} onWord={onWord} LoadingOn={LoadingOn} LoadingOff={LoadingOff}/>);
  const login = (<LoginPage onLogin={onLogin} LoadingOn={LoadingOn} LoadingOff={LoadingOff}/> );

  return (
    <div className="App">
      {isLoading? <div className="loading"></div> : (isLoggedIn ? content : login)}
    </div>
  );
}

export default App;