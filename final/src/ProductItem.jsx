function ProductItem({foodname, price,url}) {
    return (
        <div className="product-item">
            <div className="myproduct-picture"><img src={url} alt="" /></div>
            <div className="myproduct-name">name: {foodname}</div>
            <div className="myproduct-price">price: {price}</div>
            <div><button>upload to market</button></div>
            <div><button>delete</button></div>
        </div>
    )
}

export default ProductItem;