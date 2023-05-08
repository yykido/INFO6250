const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const chat = require('./chat');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); // Parses requests with json content bodies

// Sessions
// Check for existing session (used on page load)
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  // console.log("show sessions:");
  // console.log(sessions);
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username});
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
    // ---------------------------------------------------------------- dog!!!
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  // ----------------------------------------------------------------

  const sid = sessions.addSession(username);
  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
});

// Chat

app.get('/api/chat', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

//   const storedWord = users.wordFor[username] || "";
  const message = chat.messages;
  let usersLoggedIn = {};
  // traverse the session values, add the username to the usersLoggedIn which does not exist in the session in the list before
  for(let key in sessions.sessions) {
      const usernameInSession = sessions.getSessionUser(key);
      if(!usersLoggedIn[usernameInSession]) {
          usersLoggedIn[usernameInSession] = usernameInSession;
      }
  }
  res.json({ username,message,usersLoggedIn});
});

app.post('/api/chat', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

if(word == '') {
    res.status(400).json({error: 'empty-message-not-allowed'});
    return;
}

  chat.addMessage(username,word);
  const message = chat.messages;
  res.json({ message });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
