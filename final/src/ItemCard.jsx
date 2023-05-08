import { add } from 'nodemon/lib/rules';
import services from './services';

function ItemCard({id, username, foodname, price, address, email, status, onAddToCart}) {
    const addToCart = () => {
        onAddToCart(username,foodname, price);
    }
    return(
        <div className="foods-layout">
            <div>picture</div>
            <div>
                <div>
                    <div className='username'>{username}</div>
                    <div>
                        <div className='foodname'>{foodname}</div>
                        <div className='price'>{price}</div>
                    </div>
                </div>
                <div className='address'>{address}</div>
                <div className='email'>{email}</div>
                <div onClick={addToCart}>Add to Cart</div>
            </div>
        </div>
    )
}

export default ItemCard;