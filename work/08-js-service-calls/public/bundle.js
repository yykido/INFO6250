/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/htmlLayout.js":
/*!***************************!*\
  !*** ./src/htmlLayout.js ***!
  \***************************/
/***/ ((module) => {

var layout = {
  login: function login() {
    return "\n        <div class=\"login-page\">\n            <div id=\"login-error\"></div>\n            <div class=\"input-box\"><input id=\"username\" type=\"text\" placeholder=\"username\"></div>\n            <div class=\"button-box\"><button class=\"login-btn\">Login</button></div>\n        </div>\n        ";
  },
  word: function word(username, _word) {
    return "\n        <div class=\"top\">\n            <div class=\"top-left\"></div>\n            <div class=\"top-mid\">Word Storage</div>\n            <div class=\"top-right\">\n                <div class=\"logedin-username\">account: ".concat(username, "</div>\n                <div class=\"logout-btn-container\"><button class=\"logout-btn\">log out</button></div>\n            </div>\n        </div>\n        <div class=\"down\">\n            <div class=\"down-container\">\n                <div class=\"word-part\">\n                    <div class=\"storedWord-title\">Your word: ").concat(_word, "</div>\n                </div>\n                <div>\n                    <div class=\"your-word-container\"><input class=\"set-input\" type=\"text\" placeholder=\"new word\"><div id=\"text-error\"></div></div>\n                    <div><button class=\"set-btn\">Set</button></div>\n                </div>\n            </div>\n        </div>\n        ");
  }
};
module.exports = layout;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((module) => {

// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

var fetchLogin = function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
};

var checkIfLogin = function checkIfLogin() {
  return fetch('/api/session/')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
};

var Logout = function Logout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
};
var displayWord = function displayWord() {
  return fetch('/api/word/')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
};

var setWord = function setWord(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
};
module.exports = {
  fetchLogin: fetchLogin,
  checkIfLogin: checkIfLogin,
  Logout: Logout,
  displayWord: displayWord,
  setWord: setWord
};

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
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _htmlLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlLayout */ "./src/htmlLayout.js");
/* harmony import */ var _htmlLayout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_htmlLayout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_services__WEBPACK_IMPORTED_MODULE_1__);


var wordPage = false;
var validWord = true;
var validUsername = true;
var username = "";
var word = "";

// check if loged in
var LogedinResult = _services__WEBPACK_IMPORTED_MODULE_1___default().checkIfLogin();
LogedinResult.then(function (data) {
  username = data.username;
  var wordPromise = _services__WEBPACK_IMPORTED_MODULE_1___default().displayWord(username);
  wordPage = true;
  wordPromise.then(function (data) {
    word = data.storedWord;
    render();
  })["catch"](function (error) {
    console.error(error); // auth-missing go back to login page and reset the status
    wordPage = false;
    username = "";
    word = "";
    validUsername = true;
  });
})["catch"](function (error) {
  console.error("remain in the login page");
});
var loginEl = document.querySelector('.login');
loginEl.addEventListener('click', function (e) {
  // submit login 
  if (e.target.classList.contains('login-btn')) {
    console.log("login button clicked");
    var usernameEl = document.querySelector('#username');
    username = usernameEl.value;
    var usernamePromise = _services__WEBPACK_IMPORTED_MODULE_1___default().fetchLogin(username); // submit the username to check if it is valid
    usernamePromise.then(function (data) {
      console.log("submit username successfully!");
      username = data.username; // can be deleted?
      var wordPromise = _services__WEBPACK_IMPORTED_MODULE_1___default().displayWord(username);
      wordPromise.then(function (data) {
        word = data.storedWord; // change the word value
        wordPage = true; // show the data page
        render();
      })["catch"](function (error) {
        // auth-missing go back to login page and reset the status
        console.error(error);
        wordPage = false;
        username = "";
        word = "";
        render();
      });
    })["catch"](function (error) {
      // error invalid username go back to login page, reset the status and show error message
      console.error(error);
      wordPage = false;
      validUsername = false;
      username = "";
      word = "";
      render();
    });
  }
});
var dataEl = document.querySelector('.data');
dataEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('set-btn')) {
    var responseFromWord = _services__WEBPACK_IMPORTED_MODULE_1___default().setWord(document.querySelector('.set-input').value);
    responseFromWord.then(function (data) {
      word = data.storedWord;
      validWord = true;
      render();
    })["catch"](function (error) {
      console.error(error);
      validWord = false;
      render();
    });
  }
  if (e.target.classList.contains('logout-btn')) {
    var responseFromDelete = _services__WEBPACK_IMPORTED_MODULE_1___default().Logout();
    responseFromDelete.then(function (data) {
      validWord = true;
      wordPage = false;
      validUsername = true;
      username = "";
      word = "";
      render();
    })["catch"](function (error) {
      console.error(error);
    });
  }
});
var render = function render() {
  if (wordPage) {
    dataEl.innerHTML = _htmlLayout__WEBPACK_IMPORTED_MODULE_0___default().word(username, word);
    loginEl.innerHTML = '';
    if (!validWord) {
      document.getElementById('text-error').innerHTML = "invalid word!";
    }
  } else {
    dataEl.innerHTML = '';
    loginEl.innerHTML = _htmlLayout__WEBPACK_IMPORTED_MODULE_0___default().login();
    if (!validUsername) {
      document.getElementById('login-error').innerHTML = "Invalid username. Please enter a username consisting of English characters and numbers only.";
    }
  }
};
render();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map