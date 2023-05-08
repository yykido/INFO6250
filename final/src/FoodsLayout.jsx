import services from './services';
import Card from './Card';
import './FoodsLayout.css';

function FoodsLayout({marketFoods,renderCart,onLogout, showAlreadyPick, hideAlreadyPick}) {
    const components = marketFoods.map((item, index) => {
        const url = item.url;
        const id = item.id;
        const username = item.username;
        const foodname = item.foodname;
        const price = item.price;
        const address = item.address;
        const email = item.email;
        const status = item.status;
        return <Card className='card' key={index} url={url} id={id} username={username} foodname={foodname} price={price} address={address} email={email} status={status} renderCart={renderCart} showAlreadyPick={showAlreadyPick} hideAlreadyPick={hideAlreadyPick}/>;
    });

    return(
        <div className="marketfoods-layout">
            {components}
        </div>
    )
}

export default FoodsLayout;