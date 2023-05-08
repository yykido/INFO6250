import chatWeb from "./chat-web";
import chat from "../chat";
import services from "./services";
import htmlLayout from "./htmlLayout";
import state from "./state"

// check if loged in
const LogedinResult = services.checkIfLogin();
LogedinResult
.then(data => {
    state.username = data.username;
    const wordPromise = services.displayChat(state.username);
    state.chatPage = true;
    wordPromise
    .then(data => {
        if(data.message) {
            state.messages = data.message;
            state.usersLoggedIn = data.usersLoggedIn;
        }
        render();
    })
    .catch(error => {
        console.error(error);// auth-missing go back to login page and reset the status
        state.chatPage = false;
        state.username = "";
        state.validUsername = true;
    });
})
.catch(error => {
    console.error("remain in the login page");
});


let loginEl = document.querySelector('.login');
loginEl.addEventListener('click', (e) => {
    // submit login 
    if(e.target.classList.contains('login-btn')) {
        console.log("login button clicked");
        const usernameEl = document.querySelector('#username');
        state.username = usernameEl.value;
        const usernamePromise = services.fetchLogin(state.username);// submit the username to check if it is valid
        usernamePromise
        .then(data => {
            console.log("submit username successfully!");
            state.username = data.username; // can be deleted?
            const wordPromise = services.displayChat(state.username); 
            wordPromise
            .then(data => {
                if(data.message) {
                    state.messages = data.message;
                    state.usersLoggedIn = data.usersLoggedIn;
                }
                console.log("messages");
                console.log(state.messages);
                state.chatPage = true; // show the data page
                render();
            })
            .catch(error => { // auth-missing go back to login page and reset the status
                console.error(error);
                state.chatPage = false;
                state.username = "";
                render();
            });
        })
        .catch(error => { // error invalid username go back to login page, reset the status and show error message
            console.error(error);
            state.chatPage = false;
            state.validUsername = false;
            state.username = "";
            render();
        });
    }
});

function refreshChat() {
    services.checkIfLogin()
    .then(data => {
        state.username = data.username;
        const wordPromise = services.displayChat(state.username);
        state.chatPage = true;
        wordPromise
        .then(data => {
            if(data.message) {
                state.messages = data.message;
                state.usersLoggedIn = data.usersLoggedIn;
            }
            smallRender();
        })
        .catch(error => {
            console.error(error);// auth-missing go back to login page and reset the status
            state.chatPage = false;
            state.username = "";
            state.validUsername = true;
        });
    })
    .catch(error => {
        console.error("remain in the login page");
    });
}

function pollChat() { 
    refreshChat(); 
    // fetch and use data 
    setTimeout( pollChat, 2000 ); 
}


let chatEl = document.querySelector('.chat');
let sendMessageEl = document.querySelector('.sendMessage');

sendMessageEl.addEventListener('click', (e)=> {
    // send new message from current user
    if(e.target.classList.contains('send-btn')) {
        console.log("send button clicked");
        const responseFromWord = services.sendMessage(document.querySelector('.to-send').value);
        responseFromWord
        .then(data => {
            state.messages = data.message;
            sendMessageEl.innerHTML = '';
            const chatWindow = document.querySelector('.chat');
            chatWindow .scrollTop = chatWindow .scrollHeight;
            state.validWord = true;
            render();
        })
        .catch(error => {
            console.error(error);
            state.validWord = false;
            render();
        })
    }
});

chatEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('logout-btn')) {
        const responseFromDelete = services.Logout();
        responseFromDelete
        .then(data => {
            state.validWord = true;
            state.chatPage = false;
            state.validUsername = true;
            state.username = "";
            state.messages = "";
            state.usersLoggedIn = "";
            render();
        })
        .catch(error => {
            console.error(error);
        });
    }
});

const render = function() {
    if(state.chatPage) {
        console.log(chat.messages);
        chat.messages = state.messages;
        chat.users = state.usersLoggedIn;
        chatEl.innerHTML = chatWeb.chatPage(chat,state.username);
        sendMessageEl.innerHTML = chatWeb.getOutgoing();
        loginEl.innerHTML = '';
    }
    else {
        chatEl.innerHTML = '';
        sendMessageEl.innerHTML = '';
        loginEl.innerHTML = htmlLayout.login();
    }
}

const smallRender = function() {
    if(state.chatPage) {
        chat.messages = state.messages;
        chat.users = state.usersLoggedIn;
        chatEl.innerHTML = chatWeb.chatPage(chat,state.username);
        loginEl.innerHTML = '';
    }
    else {
        chatEl.innerHTML = '';
        sendMessageEl.innerHTML = '';
        loginEl.innerHTML = htmlLayout.login();
    }
}

render();

pollChat();