import cats from './cat';
import functionsInRender from './functionsInRender';

let cart = [];

//get the left side of the index.html
const leftPartEl = document.querySelector('.left-side');
// add the event listeners for the left side
leftPartEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('cat-add-button')) {
        // check if the cart has the item already
        const index = cart.findIndex(obj => obj.name === e.target.dataset.name);
        const containsObject = index !== -1;
        // if the cart has the item update the data of the item in the cart
        if(containsObject) {
            const catToUpdate = cart.find(obj => obj.name === e.target.dataset.name);
            catToUpdate.quantity = catToUpdate.quantity+1;
            catToUpdate.total = (parseFloat(catToUpdate.total)+parseFloat(catToUpdate.price)).toFixed(2);
        }
        // if the cart does not contain the item, just push the item into the cart
        else {
            cart.push({
                img: e.target.dataset.img,
                name: e.target.dataset.name,
                price: e.target.dataset.price,
                quantity:1,
                total: e.target.dataset.price
            });
        }
    }
    render();
});

// get the right side from the index.html
const rightPartEl = document.querySelector('.right-side');

// add the event listeners for the right side
rightPartEl.addEventListener('click',(e) => {
    if(e.target.classList.contains('hide-button')) {
        hideStatus = true;
    }
    if(e.target.classList.contains('view-button')) {
        hideStatus = false;
    }
    if(e.target.classList.contains('checkout-button')) {
        cart = [];
        hideStatus = true;
    }
    if(e.target.classList.contains('plus-button')) {
        const gottenIndex = e.target.dataset.index;
        cart[gottenIndex].quantity = cart[gottenIndex].quantity+1;
        cart[gottenIndex].total = (parseFloat(cart[gottenIndex].total)+parseFloat(cart[gottenIndex].price)).toFixed(2);
    }
    if(e.target.classList.contains('minus-button')) {
        const gottenIndex = e.target.dataset.index;
        cart[gottenIndex].quantity = cart[gottenIndex].quantity-1;
        cart[gottenIndex].total = (parseFloat(cart[gottenIndex].total)-parseFloat(cart[gottenIndex].price)).toFixed(2);
        if(cart[gottenIndex].quantity == 0) {
            cart.splice(gottenIndex, 1);
        }
    }
    render();
});

// create hide status equal to true as default
let hideStatus = true;

// Create render function
const render = function() {
    const catCards = functionsInRender.wrapCats(cats);
    let wrappedItems = functionsInRender.wrapItem(cart);
    const itemTitle = functionsInRender.generateTitle();
    wrappedItems = itemTitle+wrappedItems;

    let checkoutTotal = 0;
    for(let i=0; i<cart.length; i++) {
        checkoutTotal = checkoutTotal + parseFloat(cart[i].total);
    }
    checkoutTotal = checkoutTotal.toFixed(2);
    
    const hideHtml = `<div><button class="hide-button">Hide Cart</button></div>`;
    let viewCartHtml = `<div class="view-bg"><button class="view-button">View Cart</button></div>`;
    let itemQuantity = 0;
    if(cart.length>0) {
        for(let i=0; i<cart.length; i++) {
            itemQuantity += cart[i].quantity;
        }
        viewCartHtml = `<div><button class="view-button">View Cart (${itemQuantity})</button></div>`;
    }
    else {
        wrappedItems = `<div class="item">Nothing in the cart</div>`
    }

    const totalHtml = functionsInRender.wrapTotal(checkoutTotal);

    leftPartEl.innerHTML = catCards;
    if(hideStatus) {
        rightPartEl.innerHTML = viewCartHtml;
    }
    else {
        rightPartEl.innerHTML = `<div class="cart-top">${hideHtml}${wrappedItems}</div>`+totalHtml;
    }
};

render();