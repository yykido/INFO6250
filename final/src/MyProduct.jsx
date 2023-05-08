import services from './services';
import ProductItem from './ProductItem';
import './MyProduct.css';


function MyProduct({myProducts,renderMyPorduct,openEditProduct}) {
    const components = myProducts.map((item, index) => {
        const url = item.url;
        const foodname = item.foodname;
        const price = item.price;

        return <ProductItem className='my-product' key={index} url={url} id={index} foodname={foodname} price={price}/>
        
    });

    const deleteProduct = () => {

    }
    const arr = [];

    // const components = arr.map((item,index) => {
        
    //     return <ProductItem />
    // });

    
    return(
        <div className="myproduct">
            <div className='myproduct-top'>
                <div></div>
                <div>My Product</div>
                <div className='add-new-product' onClick={openEditProduct}>+</div>
            </div>
            {components}

            
        </div>
    )
}

export default MyProduct;