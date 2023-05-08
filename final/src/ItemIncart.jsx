import services from './services';

function ItemIncart({index, id, foodname, price, renderCart}) {
    const deleteItem = () => {
        services.deleteFromCart(index)
        .then( data => {
            renderCart(data.myCart);

        })
        .catch(err => {
            console.error(err);
        })

    }

    return(
        <div className="cart-item">
            <div className='item-index'>{index}</div>
            <div className='item-id'>{id}</div>
            <div className='item-foodname'>{foodname}</div>
            <div className='item-price'>{price}</div>
            <button className='item-delete-button' onClick={deleteItem}>delete</button>
        </div>
    )
}

export default ItemIncart;