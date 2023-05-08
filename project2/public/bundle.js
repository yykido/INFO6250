/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./chat.js":
/*!*****************!*\
  !*** ./chat.js ***!
  \*****************/
/***/ ((module) => {

var messages = [];
function addMessage(sender, text) {
  // Leave this as `sender` - I want to see you solve the name disagreement
  messages.push({
    sender: sender,
    text: text
  });
}
var chat = {
  messages: messages,
  addMessage: addMessage
};
module.exports = chat;

/***/ }),

/***/ "./src/chat-web.js":
/*!*************************!*\
  !*** ./src/chat-web.js ***!
  \*************************/
/***/ ((module) => {

var chatWeb = {
  chatPage: function chatPage(chat, username) {
    return "\n            <div id=\"chat-app\">\n              <div class=\"chat-app-left\">\n                ".concat(chatWeb.getUserList(chat), "\n                <div class=\"username-and-logout\">\n                  <div class=\"logout-username\">ID: ").concat(username, "</div>\n                  <button class=\"logout-btn\">log out</button>\n                </div>\n              </div>\n              <div class=\"chat-app-right\">\n                ").concat(chatWeb.getMessageList(chat), " \n              </div>\n            </div>\n    ");
  },
  getMessageList: function getMessageList(chat) {
    return "<ol class=\"messages\">" +
    // Generate the HTML for the list of messages
    Object.values(chat.messages).map(function (user) {
      return "\n        <li>\n          <div class=\"message\">\n            <div class=\"sender-info\">\n              <span class=\"username\">".concat(user.sender, "</span>\n              </div>\n              <div class=\"massage-info\">\n                <p class=\"message-text\">").concat(user.text, "</p>\n              </div>\n          <div>\n        </li>\n        ");
    }).join('') + "</ol>";
  },
  getUserList: function getUserList(chat) {
    return "<ul class=\"users\">" + Object.values(chat.users).map(function (user) {
      return "\n        <li>\n          <div class=\"user\">\n            <span >".concat(user, "</span>\n          </div>\n        </li>\n      ");
    }).join('') + "</ul>";
  },
  getOutgoing: function getOutgoing() {
    // Generate the HTML for a form to send a message
    return "\n      <div class=\"outgoing\">\n            <div class=\"flexone\"><input name=\"text\" class=\"to-send\" placeholder=\"Enter message to send\"/></div>\n            <div class=\"flextwo\"><button class=\"send-btn\" type=\"submit\">Send</button></div>\n        </div>\n      ";
  }
};
module.exports = chatWeb;

/***/ }),

/***/ "./src/htmlLayout.js":
/*!***************************!*\
  !*** ./src/htmlLayout.js ***!
  \***************************/
/***/ ((module) => {

var layout = {
  login: function login() {
    return "\n        <div class=\"login-page\">\n            <div id=\"login-error\"></div>\n            <div class=\"input-box\"><input id=\"username\" type=\"text\" placeholder=\"username\"></div>\n            <div class=\"button-box\"><button class=\"login-btn\">Login</button></div>\n        </div>\n        ";
  }
};
module.exports = layout;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((module) => {

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
var displayChat = function displayChat() {
  return fetch('/api/chat/')["catch"](function () {
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

var sendMessage = function sendMessage(word) {
  return fetch('/api/chat/', {
    method: 'POST',
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
  displayChat: displayChat,
  sendMessage: sendMessage
};

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((module) => {

var state = {
  chatPage: false,
  validUsername: true,
  validWord: true,
  username: "",
  messages: "",
  usersLoggedIn: ""
};
module.exports = state;

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
/* harmony import */ var _chat_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat-web */ "./src/chat-web.js");
/* harmony import */ var _chat_web__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chat_web__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chat */ "./chat.js");
/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _htmlLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./htmlLayout */ "./src/htmlLayout.js");
/* harmony import */ var _htmlLayout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_htmlLayout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_state__WEBPACK_IMPORTED_MODULE_4__);






// check if loged in
var LogedinResult = _services__WEBPACK_IMPORTED_MODULE_2___default().checkIfLogin();
LogedinResult.then(function (data) {
  (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = data.username;
  var wordPromise = _services__WEBPACK_IMPORTED_MODULE_2___default().displayChat((_state__WEBPACK_IMPORTED_MODULE_4___default().username));
  (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = true;
  wordPromise.then(function (data) {
    if (data.message) {
      (_state__WEBPACK_IMPORTED_MODULE_4___default().messages) = data.message;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn) = data.usersLoggedIn;
    }
    render();
  })["catch"](function (error) {
    console.error(error); // auth-missing go back to login page and reset the status
    (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = false;
    (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = "";
    (_state__WEBPACK_IMPORTED_MODULE_4___default().validUsername) = true;
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
    (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = usernameEl.value;
    var usernamePromise = _services__WEBPACK_IMPORTED_MODULE_2___default().fetchLogin((_state__WEBPACK_IMPORTED_MODULE_4___default().username)); // submit the username to check if it is valid
    usernamePromise.then(function (data) {
      console.log("submit username successfully!");
      (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = data.username; // can be deleted?
      var wordPromise = _services__WEBPACK_IMPORTED_MODULE_2___default().displayChat((_state__WEBPACK_IMPORTED_MODULE_4___default().username));
      wordPromise.then(function (data) {
        if (data.message) {
          (_state__WEBPACK_IMPORTED_MODULE_4___default().messages) = data.message;
          (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn) = data.usersLoggedIn;
        }
        console.log("messages");
        console.log((_state__WEBPACK_IMPORTED_MODULE_4___default().messages));
        (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = true; // show the data page
        render();
      })["catch"](function (error) {
        // auth-missing go back to login page and reset the status
        console.error(error);
        (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = false;
        (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = "";
        render();
      });
    })["catch"](function (error) {
      // error invalid username go back to login page, reset the status and show error message
      console.error(error);
      (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = false;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validUsername) = false;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = "";
      render();
    });
  }
});
function refreshChat() {
  _services__WEBPACK_IMPORTED_MODULE_2___default().checkIfLogin().then(function (data) {
    (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = data.username;
    var wordPromise = _services__WEBPACK_IMPORTED_MODULE_2___default().displayChat((_state__WEBPACK_IMPORTED_MODULE_4___default().username));
    (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = true;
    wordPromise.then(function (data) {
      if (data.message) {
        (_state__WEBPACK_IMPORTED_MODULE_4___default().messages) = data.message;
        (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn) = data.usersLoggedIn;
      }
      smallRender();
    })["catch"](function (error) {
      console.error(error); // auth-missing go back to login page and reset the status
      (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = false;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = "";
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validUsername) = true;
    });
  })["catch"](function (error) {
    console.error("remain in the login page");
  });
}
function pollChat() {
  refreshChat();
  // fetch and use data 
  setTimeout(pollChat, 2000);
}
var chatEl = document.querySelector('.chat');
var sendMessageEl = document.querySelector('.sendMessage');
sendMessageEl.addEventListener('click', function (e) {
  // send new message from current user
  if (e.target.classList.contains('send-btn')) {
    console.log("send button clicked");
    var responseFromWord = _services__WEBPACK_IMPORTED_MODULE_2___default().sendMessage(document.querySelector('.to-send').value);
    responseFromWord.then(function (data) {
      (_state__WEBPACK_IMPORTED_MODULE_4___default().messages) = data.message;
      sendMessageEl.innerHTML = '';
      var chatWindow = document.querySelector('.chat');
      chatWindow.scrollTop = chatWindow.scrollHeight;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validWord) = true;
      render();
    })["catch"](function (error) {
      console.error(error);
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validWord) = false;
      render();
    });
  }
});
chatEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('logout-btn')) {
    var responseFromDelete = _services__WEBPACK_IMPORTED_MODULE_2___default().Logout();
    responseFromDelete.then(function (data) {
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validWord) = true;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage) = false;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().validUsername) = true;
      (_state__WEBPACK_IMPORTED_MODULE_4___default().username) = "";
      (_state__WEBPACK_IMPORTED_MODULE_4___default().messages) = "";
      (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn) = "";
      render();
    })["catch"](function (error) {
      console.error(error);
    });
  }
});
var render = function render() {
  if ((_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage)) {
    console.log((_chat__WEBPACK_IMPORTED_MODULE_1___default().messages));
    (_chat__WEBPACK_IMPORTED_MODULE_1___default().messages) = (_state__WEBPACK_IMPORTED_MODULE_4___default().messages);
    (_chat__WEBPACK_IMPORTED_MODULE_1___default().users) = (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn);
    chatEl.innerHTML = _chat_web__WEBPACK_IMPORTED_MODULE_0___default().chatPage((_chat__WEBPACK_IMPORTED_MODULE_1___default()), (_state__WEBPACK_IMPORTED_MODULE_4___default().username));
    sendMessageEl.innerHTML = _chat_web__WEBPACK_IMPORTED_MODULE_0___default().getOutgoing();
    loginEl.innerHTML = '';
  } else {
    chatEl.innerHTML = '';
    sendMessageEl.innerHTML = '';
    loginEl.innerHTML = _htmlLayout__WEBPACK_IMPORTED_MODULE_3___default().login();
  }
};
var smallRender = function smallRender() {
  if ((_state__WEBPACK_IMPORTED_MODULE_4___default().chatPage)) {
    (_chat__WEBPACK_IMPORTED_MODULE_1___default().messages) = (_state__WEBPACK_IMPORTED_MODULE_4___default().messages);
    (_chat__WEBPACK_IMPORTED_MODULE_1___default().users) = (_state__WEBPACK_IMPORTED_MODULE_4___default().usersLoggedIn);
    chatEl.innerHTML = _chat_web__WEBPACK_IMPORTED_MODULE_0___default().chatPage((_chat__WEBPACK_IMPORTED_MODULE_1___default()), (_state__WEBPACK_IMPORTED_MODULE_4___default().username));
    loginEl.innerHTML = '';
  } else {
    chatEl.innerHTML = '';
    sendMessageEl.innerHTML = '';
    loginEl.innerHTML = _htmlLayout__WEBPACK_IMPORTED_MODULE_3___default().login();
  }
};
render();
pollChat();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map