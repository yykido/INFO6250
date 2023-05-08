const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT =  process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json()); // Parses requests with json content bodies

app.get('/test',(req, res) => {
    res.json({test: 'success'});
});

// Sessions
// Check for existing session (used on page load)
app.get('/api/session', (req, res) => {
  setTimeout(function() {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    res.json({ username });
  }, 2000);
});
  
  // Create a new session (login)
  app.post('/api/session', (req, res) => {
    setTimeout(function() {
      const { username } = req.body;

      if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
      }
    
      if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
      }
    
      const sid = sessions.addSession(username);
    
      res.cookie('sid', sid);
      res.json({ username });
    }, 2000);
 
  });
  
  app.delete('/api/session', (req, res) => {
    setTimeout(function() {
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
    },0);
    
  });
  
  // Stored Word
  app.get('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const storedWord = users.wordFor[username] || "";
  
    res.json({ username, storedWord });
  });
  
  app.put('/api/word', (req, res) => {
    setTimeout(function() {
      const sid = req.cookies.sid;
      const username = sid ? sessions.getSessionUser(sid) : '';
      if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
      }
    
      const { word } = req.body;
      if(!word && word !== '') {
        res.status(400).json({ error: 'required-word' });
        return;
      }
    
      if(!users.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-word' });
        return;
      }
    
      users.wordFor[username] = word;
    
      res.json({ username, storedWord: word });
      
    }, 0);

  });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));