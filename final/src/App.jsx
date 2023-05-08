import './App.css';
import './loading.css';

import LoginPage from './LoginPage';
import {useState, useEffect} from 'react';
import services from './services';
import Signup from './Signup';
import MarketPage from './MarketPage';
import Editing from './Editing';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inSignupPage, setInSignupPage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMyProductFile, setIsMyProductFile] = useState(false);
  const [marketFoods, setMarketFoods] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [alreadyPick, setAlreadyPick] = useState('');

  const renderCart = (arr) => {
    setItemsInCart(arr);
  }
  const showAlreadyPick = ()=> {
    setAlreadyPick('This item is already in the cart.');
  }

  const openEditProduct = () => {
    setIsEditing(true);
  }
  const closeEditProduct = () => {
    setIsEditing(false);
  }

  const hideAlreadyPick = ()=> {
    setAlreadyPick('');
  }

  const renderEmptyCart = () => {
    setItemsInCart([])
  }

  const renderMyCart = (arr) => {
    setItemsInCart(arr);

  }

  const onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  }
  const goToLoginPage = () => {
    setInSignupPage(false);
  }

  const goToSignupPage = () => {
    setInSignupPage(true);
  }

  const getFoodsData = (foodsData) => {
    setMarketFoods(foodsData);
  }


  const LoadingOn = () => {
    setIsLoading(true);
  }

  const LoadingOff = () => {
    setIsLoading(false);
  }


  const onLogout = () => setIsLoggedIn(false);

  // useEffect(
  //   ()=> {


  //   },
  //   [itemsInCart]
  // );

  useEffect( 
    () => { 
      // setIsLoading(true);
      services.checkIfLogin()
      .then( data => { 
        // 1. successfully loged in
        setIsLoggedIn(true);
        setUsername(data.userInfo.username);
        setMarketFoods(data.foodItems);
        /// !!!check  setItemsInCart ----------------------------------------------------------------
        setItemsInCart(data.myCart);
        services.displayFoods()
        .then(data => {
            getFoodsData(data.foodItems);
        })
        .catch(error => {
            console.error(error);
        })
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
  const market = <MarketPage username={username} onLogout={onLogout} marketFoods={marketFoods} renderCart={renderCart} itemsInCart={itemsInCart} showAlreadyPick={showAlreadyPick} hideAlreadyPick={hideAlreadyPick} alreadyPick={alreadyPick} openEditProduct={openEditProduct} myProducts={myProducts}/>
  const login = (<LoginPage onLogin={onLogin} LoadingOn={LoadingOn} LoadingOff={LoadingOff} goToSignupPage={goToSignupPage} getFoodsData={getFoodsData} renderMyCart={renderMyCart}/> );
  const signup = (<Signup onLogin={onLogin} getFoodsData={getFoodsData} goToLoginPage={goToLoginPage} renderEmptyCart={renderEmptyCart} hideAlreadyPick={hideAlreadyPick}/>);
  const editing = (<Editing closeEditProduct={closeEditProduct}/>)
  return (
    <div className="App">
      {isLoading? <div className="loading"></div> : (isLoggedIn ? (isEditing? editing : market) : (inSignupPage? signup:login))}
    </div>
  );
}

export default App;
