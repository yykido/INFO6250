import ItemIncart from "./ItemIncart";
import services from "./services";
import './Cart.css';

function Cart({itemsInCart,renderCart,alreadyPick,hideAlreadyPick}) {
    const checkout = ()=> {
        hideAlreadyPick();
        services.checkoutCart()
        .then(data => {
            renderCart(data.myCart);
        })
        .catch(err => {
            console.error(err);
        });
    }
    const arr = [];
    let checkoutTotal = 0;
    // itemsInCart.map((item,index)
    const components = itemsInCart?.map((item,index) => {
        const id = item.id;
        const foodname = item.foodname;
        const price = item.price;
        checkoutTotal += parseFloat(price);
        return <ItemIncart key={index+1} index={index+1} id={id} foodname={foodname} price={price} renderCart={renderCart}/>
    });
    const twoDigitsTotal = checkoutTotal.toFixed(2);

    return(
        <div className="cart">
            <div className="cart-up-part">
                <div className="cart-name">My Cart</div>
                <div className="in-cart-title">
                    <div className="cart-title-idx">N</div>
                    <div className="cart-title-id">ID</div>
                    <div className="cart-title-food">name</div>
                    <div className="cart-title-price">price</div>
                    <div className="cart-title-rightspace"></div>
                </div>
                <div></div>
                {components}
            </div>
            <div>
                <div className="already-pick">{alreadyPick}</div>
                <div className="check-out-total">Total: ${twoDigitsTotal}</div>
                <button className="checkout-button" onClick={checkout} >Check out</button>
            </div>
        </div>
    )
}

export default Cart;