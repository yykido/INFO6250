const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
/*
const chat = require('./login'); // "chat" holds all the non-web logic for managing users/messages
const dataWeb = require('./data-web'); // "chat-web" holds the templates for the generated HTML
*/
app.use(cookieParser());
app.use(express.static('./public'));
const loginPage = require('./login');

// use uuid for session id
const{v4: uuidv4} = require('uuid');

app.use(express.urlencoded({extended:false}));
const session = {};
const store_word = {};

app.post('/datapage', (req,res) => {
	const username = req.body.username.trim();
  // check the username if it is valid
	if(username === 'dog' || !username || !isValidName(username)) {
		// show errors to clients
		res.status(403).send(`
    <div>Invalid username: Please enter a valid English name that starts with an uppercase letter and contains only English letters.</div>
    <div>
      <form action="/">
        <div class="bot-flextwo"><button class="back-btn" type="submit">Back</button></div>
      </form> 
    </div>
    `);
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
  const pattern = /^[A-Z][a-zA-Z]+$/;
  return pattern.test(str);
}

 // log out part
app.post('/logout', (req,res) => {
  const sid = req.body.sid;
  delete session[sid];
  res.clearCookie('sid');
  res.redirect('/');
});

// change stored word part
app.post('/change',express.urlencoded({ extended: false }), (req,res) => {
  const {username,word} = req.body;
  store_word[username] = word;

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
    res.send(`
    <!doctype html>
      <html>
        <head>
          <title>Data</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <div class = "datapage-top">
            <div class="top-left-box"></div>
            <div class="top-mid-box">
              <h1>Welcome! ${username} </h1>
            </div>
            <div class="top-righ-box"> 
              <form action="/logout" method="POST">
                <div class="flexone"><input type="hidden" name="sid" value= "${sid}"/></div>
                <div><button class="logout-btn" type="submit">Log out</button></div>
              </form> 
            </div>
          </div>
          <div class="datapage-mid">
            <div class="background">
              <div class="mid-top-box">
                <h2 class="headtwo"> Stored Word </h2>
              </div>
              <div class="mid-mid-box">
                ${showWord(store_word,username)}
              </div>
              <div class="mid-bot-box">
                <form class="put-area" action="/change" method="POST">
                  <input type="hidden" name="username" value="${username}">
                  <div class="bot-flexone"><input name="word" class="put-text" placeholder="Put your word"/></div>
                  <div class="bot-flextwo"><button class="put-btn"type="submit">Put</button></div>
                </form> 
              </div>
            </div>

          </div>
          <div class="datapage-bot">
            
          </div>

        </body>
      </html>  
    `);
  }

});

// check if session has "sid" or not
function isValid(sid) {
  return session.hasOwnProperty(sid);
}

function showWord(store_word,username) {
  let word = store_word[username];
  if(!word) {
    word = "";
  }
  return `
  <div>
  ${word}
  </div>
  `

}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
