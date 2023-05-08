const functionsInRender = {
    // Create a function to wrap the cats into html syntax cards
    wrapCats: function(cats) {
        const catCards = cats.map((cat,index) => {
            return `
            <div class="card" data-index="${index}">
                <div class="cat-picture-box"><img class="cat-picture"src="${cat.imgPath}" alt=""></div>
                <div class="cat-name">${cat.name}</div>
                <div class="cat-price">$${cat.price}</div>
                <div class="cat-add-button-box"><button class="cat-add-button" data-img="${cat.imgPath}" data-name="${cat.name}" data-price="${cat.price}">Add to Cart</button></div> 
            </div>
            `;
        }).join('');
        return catCards;
    },
    // Create a function to wrap the cart into html syntax
    wrapItem: function(cart) {
        let wrappedItems = cart.map((item,index) => {
            return `
            <div class="item no-empty">
                <div class="item-img-box"><img class="item-img" src="${item.img}" alt=""></div>
                <div class="item-name">${item.name}</div>
                <div class="minus">
                    <button class="minus-button" data-index="${index}">-</button>
                </div>
                <div class="item-quantity">${item.quantity}</div>
                <div class="plus">
                    <button class="plus-button" data-index="${index}">+</button>
                </div>
                <div class="item-total">${item.total}</div>
            </div>
            `;
        }).join('');

        return wrappedItems;
    },

    generateTitle: function() {
        return `
        <div class="title">
            <div class="title-img">item</div>
            <div class="title-name">name</div>
            <div class="title-quantity">quantity</div>
            <div class="title-total">total</div>
        </div>`;
    },
    wrapTotal: function(checkoutTotal) {
        const totalHtml = `
        <div>
            <div>
                <div class="check-out-total">Total: $${checkoutTotal}</div>
            </div>
            <div class="checkout-button-div"><button class="checkout-button">Checkout</button></div>
        </div>
        `;
        return totalHtml;
    }

}

module.exports = functionsInRender;