const express = require('express');
const {JSDOM} = require('jsdom');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
const loginPage = require('./login');
const homePage = require('./homepage');
const words = require('./words');
const loginErrorPage = require('./loginError');
const compare = require('./compare');

// use uuid for session id
const{v4: uuidv4} = require('uuid');

app.use(express.urlencoded({extended:false}));
const session = {};
const data = {};

app.post('/gamepage', (req,res) => {
	const username = req.body.username.trim();
  // check the username if it is valid
	if(username === 'dog' || !username || !isValidName(username)) {
		// show errors to clients
		res.status(401).send(loginErrorPage.show());
		return;
	}
  // create a sid using uuid and put it with username to the session
	const sid = uuidv4();
	session[sid] = {username}; 
	res.cookie('sid',sid);
	res.redirect('/');
});

// check the username starts with an uppercase letter and contains only English letters
function isValidName(str) {
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(str);
}

 // log out part
app.post('/logout', (req,res) => {
  const sid = req.cookies.sid;
  delete session[sid];
  res.clearCookie('sid');
  res.redirect('/');
});

// change stored word part
app.post('/guess',express.urlencoded({ extended: false }), (req,res) => {

  const sid = req.cookies.sid;
  // check the sid from cookie if the sid is not valid. It will be deleted. 
  if(!sid || !isValid(sid)) {
		res.clearCookie('sid'); 
		res.send(loginPage.show()); // go to the login page
	}
  let {username,word} = req.body;
  //check if the word is valid or not
  const remaining = data[username].remaining;
  word = word.toLowerCase();
  // invalid word
  if(!remaining.includes(word)) {
    data[username].isValidWord = false;
    data[username].winThisGame = false;
  } 
  // win the game. The word is equal to the target word
  else if(word === data[username].targetWord){

      const wordsCopy = Array.from(words);
      const target = words[Math.floor(Math.random() * wordsCopy.length)];

      data[username].remaining = wordsCopy;
      data[username].preGuess = [];
      data[username].preGuessMaches = [];
      data[username].preGame.push(data[username].count+1);
      data[username].targetWord = target;
      data[username].numberMatch = 0;
      data[username].mostRecentWord = "";
      data[username].preTargetWord = word;
      data[username].winThisGame = true;
      data[username].isValidWord = true;
      console.log(username);
      console.log(target);
      data[username].count = 0; 
  }
  // valid word but not the target word
  else {
      const filteredArr = data[username].remaining.filter(element => element != word);
      let preword = word.toUpperCase();
      let postword = data[username].targetWord.toUpperCase();
      const matched = compare(preword,postword);
      data[username].remaining = Array.from(filteredArr);
      data[username].preGuess.push(word);
      data[username].preGuessMaches.push(matched);
      data[username].count = data[username].count+1;
      data[username].numberMatch = matched;
      data[username].mostRecentWord = word;
      data[username].isValidWord = true;
      data[username].winThisGame = false;
  }
  
  res.redirect('/')
});

app.post('/startanewgame',express.urlencoded({ extended: false }), (req, res) => {
    const username = req.body.username;
    resetDataUsername(username);
    res.redirect('/');
});

// home page
// check if it is loged in
app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  // not logged in yet or invalid session id
	if(!sid || !isValid(sid)) {
		res.clearCookie('sid');
		res.send(loginPage.show());
	}

  // logged in
  else {
    const {username} = session[sid];
    const dom = new JSDOM();
    const document = dom.window.document;
    const errorEl = document.createElement('p');
    const congEl = document.createElement('p');
    const targetWordEl = document.createElement('p');
    congEl.textContent = '';
    errorEl.textContent = '';
    targetWordEl.textContent = '';
    if(!data[username]) {
        // initalize the object
        initDataUsername(username);
    }
    if(!data[username].isValidWord) {
      errorEl.textContent = 'This is NOT a valid word';
    }
    if(data[username].winThisGame) {
      congEl.textContent = 'Congratulations! You Won!';
      targetWordEl.textContent = `The target word is: "${data[username].preTargetWord}" `;
    }

    res.send(homePage.show(username,data,errorEl,congEl,targetWordEl));
  }
});

// check if session has "sid" or not
function isValid(sid) {
  return session.hasOwnProperty(sid);
}

function initDataUsername(username) {
  const wordsCopy = Array.from(words);
  const target = words[Math.floor(Math.random() * wordsCopy.length)];
  data[username] = {
      remaining: wordsCopy,
      preGuess: [],
      preGuessMaches:[],
      targetWord: target,
      preTargetWord: "",
      preGame: [],
      count: 0,
      mostRecentWord:"",
      numberMatch:0,
      winThisGame: false,
      isValidWord: true
  }
  // print to the terminal for testing
  console.log(username);
  console.log(target);
}

// reset the data but not initialize
function resetDataUsername(username) {
  const wordsCopy = Array.from(words);
  const target = words[Math.floor(Math.random() * wordsCopy.length)];
  data[username].remaining = wordsCopy;
  data[username].preGuess = [];
  data[username].preGuessMaches = [];
  data[username].targetWord = target;
  data[username].numberMatch = 0;
  data[username].mostRecentWord = "";
  data[username].count = 0; 
  data[username].winThisGame = false;
  data[username].isValidWord = true;
  console.log(username);
  console.log(target);
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));