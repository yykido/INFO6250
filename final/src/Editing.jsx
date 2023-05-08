import services from './services';
import {useState, useEffect } from 'react';

function Editing({closeEditProduct}) {

    const [foodname, setFoodname] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const submit = function() {
        // const form = new FormData();
        // form.append('foodname', 'pizza');
        // form.append('price', price);
        // form.append('image', image);
        // console.log('form in react');
        // console.log(form);
        // services.createMyFood(foodname, price, image)
        // .then(data => {
        //     console.log(data);
        //     console.log('submit successfully!');

        // })
        // .catch(err => {
        //     console.error(err);

        // });
    }

    return(
        <div className="edit-my-product">
            <div>edit</div>
            <div className='food-picture-box'><img className='food-picture' src="" alt="" /></div>
            {/* <div><input type="text" placeholder='food name' onInput={(e) => setFoodname(e.target.value)}/></div>
            <div><input type="text" placeholder='price'  onInput={(e) => setPrice(e.target.value)}/></div>
            <label for="image">Select an image:</label>
            <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])}/>
    
            <br/>
            <button onClick={submit}>Upload</button> */}
            {/* <input type="submit" value="Upload"/> */}
            <div>
                <form action="/api/myproduct" method="POST" enctype="multipart/form-data">
                 
                    <input type="text" id="foodname" name="foodname" placeholder='Food Name'/>
                    <input type="text" id="price" name="price" placeholder='Price'/>
                    <label for="image">Select an image:</label>
                    <input type="file" id="image" name="image"/>
                    <br/>
                    <input type="submit" value="Upload"/>
                </form>
            </div>
            <div className='card-username'>seller: </div>
            <div className="card-foodId">product ID: </div>
            <div className='card-foodname'>product name: <span className='price-text'></span></div>
            <div className='card-price'>price: $ <span className='price-text'></span></div>
            <div className='card-address'>address: </div>
            <div className='card-email'>email: </div>
            <button className='card-add-btn'>Add to Cart</button>
            <button className='card-add-btn' onClick={closeEditProduct}>Close</button>
        </div>
    )
}

export default Editing;