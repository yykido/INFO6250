/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cat.js":
/*!********************!*\
  !*** ./src/cat.js ***!
  \********************/
/***/ ((module) => {

var cats = [{
  name: 'Fluffball',
  imgPath: './img/cat1.jpg',
  price: 0.99
}, {
  name: 'Mayhem',
  imgPath: './img/cat2.jpg',
  price: 3.14
}, {
  name: 'Dandan',
  imgPath: './img/cat3.jpg',
  price: 2.73
}, {
  name: 'LiuMao',
  imgPath: './img/cat4.jpg',
  price: 9.99
}];
module.exports = cats;

/***/ }),

/***/ "./src/functionsInRender.js":
/*!**********************************!*\
  !*** ./src/functionsInRender.js ***!
  \**********************************/
/***/ ((module) => {

var functionsInRender = {
  // Create a function to wrap the cats into html syntax cards
  wrapCats: function wrapCats(cats) {
    var catCards = cats.map(function (cat, index) {
      return "\n            <div class=\"card\" data-index=\"".concat(index, "\">\n                <div class=\"cat-picture-box\"><img class=\"cat-picture\"src=\"").concat(cat.imgPath, "\" alt=\"\"></div>\n                <div class=\"cat-name\">").concat(cat.name, "</div>\n                <div class=\"cat-price\">$").concat(cat.price, "</div>\n                <div class=\"cat-add-button-box\"><button class=\"cat-add-button\" data-img=\"").concat(cat.imgPath, "\" data-name=\"").concat(cat.name, "\" data-price=\"").concat(cat.price, "\">Add to Cart</button></div> \n            </div>\n            ");
    }).join('');
    return catCards;
  },
  // Create a function to wrap the cart into html syntax
  wrapItem: function wrapItem(cart) {
    var wrappedItems = cart.map(function (item, index) {
      return "\n            <div class=\"item no-empty\">\n                <div class=\"item-img-box\"><img class=\"item-img\" src=\"".concat(item.img, "\" alt=\"\"></div>\n                <div class=\"item-name\">").concat(item.name, "</div>\n                <div class=\"minus\">\n                    <button class=\"minus-button\" data-index=\"").concat(index, "\">-</button>\n                </div>\n                <div class=\"item-quantity\">").concat(item.quantity, "</div>\n                <div class=\"plus\">\n                    <button class=\"plus-button\" data-index=\"").concat(index, "\">+</button>\n                </div>\n                <div class=\"item-total\">").concat(item.total, "</div>\n            </div>\n            ");
    }).join('');
    return wrappedItems;
  },
  generateTitle: function generateTitle() {
    return "\n        <div class=\"title\">\n            <div class=\"title-img\">item</div>\n            <div class=\"title-name\">name</div>\n            <div class=\"title-quantity\">quantity</div>\n            <div class=\"title-total\">total</div>\n        </div>";
  },
  wrapTotal: function wrapTotal(checkoutTotal) {
    var totalHtml = "\n        <div>\n            <div>\n                <div class=\"check-out-total\">Total: $".concat(checkoutTotal, "</div>\n            </div>\n            <div class=\"checkout-button-div\"><button class=\"checkout-button\">Checkout</button></div>\n        </div>\n        ");
    return totalHtml;
  }
};
module.exports = functionsInRender;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cat */ "./src/cat.js");
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functionsInRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionsInRender */ "./src/functionsInRender.js");
/* harmony import */ var _functionsInRender__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_functionsInRender__WEBPACK_IMPORTED_MODULE_1__);


var cart = [];

//get the left side of the index.html
var leftPartEl = document.querySelector('.left-side');
// add the event listeners for the left side
leftPartEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('cat-add-button')) {
    // check if the cart has the item already
    var index = cart.findIndex(function (obj) {
      return obj.name === e.target.dataset.name;
    });
    var containsObject = index !== -1;
    // if the cart has the item update the data of the item in the cart
    if (containsObject) {
      var catToUpdate = cart.find(function (obj) {
        return obj.name === e.target.dataset.name;
      });
      catToUpdate.quantity = catToUpdate.quantity + 1;
      catToUpdate.total = (parseFloat(catToUpdate.total) + parseFloat(catToUpdate.price)).toFixed(2);
    }
    // if the cart does not contain the item, just push the item into the cart
    else {
      cart.push({
        img: e.target.dataset.img,
        name: e.target.dataset.name,
        price: e.target.dataset.price,
        quantity: 1,
        total: e.target.dataset.price
      });
    }
  }
  render();
});

// get the right side from the index.html
var rightPartEl = document.querySelector('.right-side');

// add the event listeners for the right side
rightPartEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('hide-button')) {
    hideStatus = true;
  }
  if (e.target.classList.contains('view-button')) {
    hideStatus = false;
  }
  if (e.target.classList.contains('checkout-button')) {
    cart = [];
    hideStatus = true;
  }
  if (e.target.classList.contains('plus-button')) {
    var gottenIndex = e.target.dataset.index;
    cart[gottenIndex].quantity = cart[gottenIndex].quantity + 1;
    cart[gottenIndex].total = (parseFloat(cart[gottenIndex].total) + parseFloat(cart[gottenIndex].price)).toFixed(2);
  }
  if (e.target.classList.contains('minus-button')) {
    var _gottenIndex = e.target.dataset.index;
    cart[_gottenIndex].quantity = cart[_gottenIndex].quantity - 1;
    cart[_gottenIndex].total = (parseFloat(cart[_gottenIndex].total) - parseFloat(cart[_gottenIndex].price)).toFixed(2);
    if (cart[_gottenIndex].quantity == 0) {
      cart.splice(_gottenIndex, 1);
    }
  }
  render();
});

// create hide status equal to true as default
var hideStatus = true;

// Create render function
var render = function render() {
  var catCards = _functionsInRender__WEBPACK_IMPORTED_MODULE_1___default().wrapCats((_cat__WEBPACK_IMPORTED_MODULE_0___default()));
  var wrappedItems = _functionsInRender__WEBPACK_IMPORTED_MODULE_1___default().wrapItem(cart);
  var itemTitle = _functionsInRender__WEBPACK_IMPORTED_MODULE_1___default().generateTitle();
  wrappedItems = itemTitle + wrappedItems;
  var checkoutTotal = 0;
  for (var i = 0; i < cart.length; i++) {
    checkoutTotal = checkoutTotal + parseFloat(cart[i].total);
  }
  checkoutTotal = checkoutTotal.toFixed(2);
  var hideHtml = "<div><button class=\"hide-button\">Hide Cart</button></div>";
  var viewCartHtml = "<div class=\"view-bg\"><button class=\"view-button\">View Cart</button></div>";
  var itemQuantity = 0;
  if (cart.length > 0) {
    for (var _i = 0; _i < cart.length; _i++) {
      itemQuantity += cart[_i].quantity;
    }
    viewCartHtml = "<div><button class=\"view-button\">View Cart (".concat(itemQuantity, ")</button></div>");
  } else {
    wrappedItems = "<div class=\"item\">Nothing in the cart</div>";
  }
  var totalHtml = _functionsInRender__WEBPACK_IMPORTED_MODULE_1___default().wrapTotal(checkoutTotal);
  leftPartEl.innerHTML = catCards;
  if (hideStatus) {
    rightPartEl.innerHTML = viewCartHtml;
  } else {
    rightPartEl.innerHTML = "<div class=\"cart-top\">".concat(hideHtml).concat(wrappedItems, "</div>") + totalHtml;
  }
};
render();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map