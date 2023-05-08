import htmlLayout from './htmlLayout';
import services from './services';


let wordPage = false;
let validWord = true;
let validUsername = true;
let username = "";
let word = "";

// check if loged in
const LogedinResult = services.checkIfLogin()
LogedinResult
.then(data => {
    username = data.username;
    const wordPromise = services.displayWord(username);
    wordPage = true;
    wordPromise
    .then(data => {
        word = data.storedWord;
        render();
    })
    .catch(error => {
        console.error(error);// auth-missing go back to login page and reset the status
        wordPage = false;
        username = "";
        word = "";
        validUsername = true;
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
        username = usernameEl.value;
        const usernamePromise = services.fetchLogin(username);// submit the username to check if it is valid
        usernamePromise
        .then(data => {
            console.log("submit username successfully!");
            username = data.username; // can be deleted?
            const wordPromise = services.displayWord(username); 
            wordPromise
            .then(data => {
                word = data.storedWord; // change the word value
                wordPage = true; // show the data page
                render();
            })
            .catch(error => { // auth-missing go back to login page and reset the status
                console.error(error);
                wordPage = false;
                username = "";
                word = "";
                render();
            });
        })
        .catch(error => { // error invalid username go back to login page, reset the status and show error message
            console.error(error);
            wordPage = false;
            validUsername = false;
            username = "";
            word = "";
            render();
        });
    }
});


let dataEl = document.querySelector('.data');
dataEl.addEventListener('click', e => {
    if(e.target.classList.contains('set-btn')) {
        const responseFromWord = services.setWord(document.querySelector('.set-input').value);
        responseFromWord
        .then(data => {
            word = data.storedWord;
            validWord = true;
            render();
        })
        .catch(error => {
            console.error(error);
            validWord = false;
            render();
        })
    }
    if(e.target.classList.contains('logout-btn')) {
        const responseFromDelete = services.Logout();
        responseFromDelete
        .then(data => {
            validWord = true;
            wordPage = false;
            validUsername = true;
            username = "";
            word = "";
            render();
        })
        .catch(error => {
            console.error(error);
        });
    }
})

const render = function () {
    if(wordPage) {
        dataEl.innerHTML = htmlLayout.word(username,word);
        loginEl.innerHTML = '';
        if(!validWord) {
            document.getElementById('text-error').innerHTML = "invalid word!";
        }
    }
    else {
        dataEl.innerHTML = '';
        loginEl.innerHTML = htmlLayout.login();
        if(!validUsername) {
            document.getElementById('login-error').innerHTML = "Invalid username. Please enter a username consisting of English characters and numbers only."
        }
    }
}
render();