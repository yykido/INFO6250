import FoodsLayout from './FoodsLayout';
import Logout from './Logout';
import Cart from './Cart';
import './MarketPage.css';
import MyProduct from './MyProduct';
import Searchbar from './Searchbar';

function MarketPage({username,onLogout,marketFoods,renderCart,itemsInCart,LoadingOn, LoadingOff, showAlreadyPick, hideAlreadyPick,alreadyPick,openEditProduct,myProducts}) {
    return (
        <div className="content-page">
            <div className="content-top-container">
                <div className='top-left'></div>
                <div className='storeword-title'>Cook2Order</div>
                <Logout username={username} onLogout={onLogout} LoadingOn={LoadingOn} LoadingOff={LoadingOff}/>
            </div>
            <div>
                <Searchbar/>
            </div>
            <div className='main'>
                <div className='main-left'>
                    <FoodsLayout  marketFoods={marketFoods} renderCart={renderCart} showAlreadyPick={showAlreadyPick} hideAlreadyPick={hideAlreadyPick}/>
                </div>
                <div>
                    <Cart itemsInCart={itemsInCart} renderCart={renderCart} alreadyPick={alreadyPick} hideAlreadyPick={hideAlreadyPick}/>
                    <MyProduct myProducts={myProducts} openEditProduct={openEditProduct} />
                </div>
            </div>
        </div>
    );
}


export default MarketPage;