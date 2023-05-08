import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Game from './Game';
import { useState } from 'react';
// import { is } from 'immutable';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  let onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  }
  const onLogout = () => setIsLoggedIn(false);

  const content =
  (<Game 
    username = {username}
    onLogout = {onLogout}
  />);

  const login = 
  (<Login onLogin={onLogin}/> 
  );

  return (
    <div className="App">
      {isLoggedIn ? content : login}
    </div>
  );
}

export default App;