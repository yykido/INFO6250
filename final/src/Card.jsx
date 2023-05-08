import services from './services';

function Card({url,id, username, foodname, price, address, email, status, renderCart, showAlreadyPick, hideAlreadyPick} ) {
    const addToCart = () => {
        services.addToCart(id, username, foodname, price)
        .then( data => {
            renderCart(data.myCart)
            hideAlreadyPick();
        })
        .catch(error => {
            console.error(error);
            if(error.error === "already-pick") {
                showAlreadyPick();
            }
          })
        
    }
{/* <ItemCard id={id} username={username} foodname={foodname} price={price} address={address} email={email} status={status} onAddToCart={onAddToCart}/>; */}

    return(
        <div className="card">
            <div className='food-picture-box'><img className='food-picture' src={url} alt="" /></div>
            <div className='card-username'>seller: {username}</div>
            <div className="card-foodId">product ID: {id}</div>
            <div className='card-foodname'>product name: <span className='price-text'>{foodname}</span></div>
            <div className='card-price'>price: $ <span className='price-text'>{price}</span></div>
            <div className='card-address'>address: {address}</div>
            <div className='card-email'>email: {email}</div>
            <button className='card-add-btn' onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Card;