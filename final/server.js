const express = require('express');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const uri = "mongodb+srv://yystephan:AI18dRYE5o7Z9he8@yykido.9xocqky.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const PORT =  process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const mongoDB = require('./mongoDB');
let userDataFromDatabase = [];
const { response } = require('express');
const { ConnectionClosedEvent } = require('mongodb');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json()); // Parses requests with json content bodies

let IDnumber = 1;
let foodItems = [];


const usersFromDatabase = mongoDB.getUserData();
usersFromDatabase.then(response => {
  response[0].forEach((item) => {
    const username = item.username;
    const password = item.password;
    const email = item.email;
    const address = item.address;
    if(!users.infoOf[username]) {
      users.infoOf[username] = {
        username: username,
        password: password,
        email: email,
        address: address
      }
    }
  });
  response[1].forEach((item) => {
    const username = item.username;
    const id = item.id;
    const seller = item.seller;
    const foodname = item.foodname;
    const price = item.price;
    if(!users.infoOf[username].myCart) {
      users.infoOf[username].myCart = [];
    }
    const newObject = {
      id: id,
      seller: username,
      foodname: foodname,
      price: price,
    }
    users.infoOf[username].myCart.push(newObject);
  });
  foodItems = response[2];

   // init data form database to local server
  response[3].forEach((item) => {
    const username = item.user;
    const foodname = item.foodName;
    const price = item.price;
    const imagePath = item.imagePath;
    if(!users.infoOf[username].myProduct) {
      users.infoOf[username].myProduct = [];
    }
    const newObject = {
      foodname: foodname,
      price: price,
      imagePath: imagePath,
    }
    users.infoOf[username].myProduct.push(newObject);
  });
});

// mongoDB.insertFoodToMarket();

// const cartDataFromDB = mongoDB.getCartData();
// cartDataFromDB.then(response => {
//   response.forEach((item) => {
//     const id = item.id;

//   })

// });

// const newObject = {
//   id: id,
//   seller: username,
//   foodname: foodname,
//   price: price,
// }

// if(!users.infoOf[curuser].myCart) {
//   users.infoOf[curuser].myCart = [];
// }
// const isFoodnameExist = users.infoOf[curuser].myCart.some(item => item.foodname === foodname);
// if(isFoodnameExist) {
//   res.status(400).json({ error: 'already-pick' });
//   return;
// }
// users.infoOf[curuser].myCart.push(newObject);
// const data = {
//   username: curuser,
//   id: id,
//   seller: username,
//   foodname: foodname,
//   price: price,
// }



//---------------------------------------------------------------- insert data into database

// const database = client.db('test');
// const collection = database.collection('people');
// const result = collection.insertOne({ name: 'Hahaha', age: 111 });
// console.log(`${result.insertedCount} documents were inserted`);

//------------------------------------------------------------------ get data from database
// async function getDataFromDB() {
//   const collection = client.db("cook2order").collection("user");
//   const cursor = collection.find({});
//   const documents = await cursor.toArray();

//   // console.log(documents);
//   // console.log(users.infoOf);
// }

// getDataFromDB().catch(console.dir);

// app.get('/api/getdata', async (req, res) => {
//   const collection = client.db("test").collection("people");
//   const cursor = collection.find({});
//   const documents = await cursor.toArray();
//   // const documents = await cursor.toArray();
//   // console.log(cursor);
//   res.send(documents);
// });

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
    const userInfo = users.infoOf[username];
    const myCart = users.infoOf[username].myCart;

    res.json({ userInfo, foodItems,myCart});
  }, 0);
});

//Loging 

// Create a new session (sign up)
app.post('/api/session', (req, res) => {
  setTimeout(function() {
    const { username,password,email,address} = req.body;
    if(!users.isValidUsername(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
    if(users.infoOf[username]) {
      res.status(400).json({ error: 'user-already-exist' });
      return;
    }
    if(!password || password === '') {
      res.status(400).json({ error: 'need-password' });
      return;
    }
    if(!email || email === '') {
      res.status(400).json({ error: 'need-email' });
      return;
    }
    if(!address || address === '') {
      res.status(400).json({ error: 'need-address' });
      return;
    }

    // insert data into the database
    const data = {
      username: username,
      password: password,
      email: email,
      address: address
    }
    mongoDB.insertUserData(data);
    mongoDB.getUserData();

    const sid = sessions.addSession(username);
    users.infoOf[username] = {
      username: username,
      password: password,
      email: email,
      address: address
    }
  
    res.cookie('sid', sid);
    res.json({ username });
  }, 0);
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

// Login api ----------------------------------------------------------------
app.post('/api/login', (req, res) => {
  setTimeout(function() {
    const { username, password} = req.body;
    if(!users.infoOf[username]) {
      res.status(400).json({ error: 'username-not-found' });
      return;
    }
    if(users.infoOf[username].password !== password) {
      res.status(400).json({ error: 'invalid-password' });
      return;
    }

    const userInfo = users.infoOf[username];
    const sid = sessions.addSession(username);
    let myCart = [];
    if(users.infoOf[username].myCart) {

      myCart = users.infoOf[username].myCart;
    }
    res.cookie('sid', sid);
    res.json({ userInfo,foodItems,myCart});
  }, 0);
});

// API food in market ----------------------------------------------------------------
//Get all foods in the server
app.get('/api/food', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json({foodItems});
});

// put the food in to the market
app.put('/api/uploadfood', (req, res) => {
  setTimeout(function() {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { foodname, address, email, price } = req.body;
    let inputItem = {
      id: IDnumber,
      username: username,
      foodname: foodname,
      price: price,
      address: address,
      email: email,
      status: true
    }

    foodItems.push(inputItem);
  // ----------------------------------------------------------------
    res.json({foodItems});
    
  }, 0);
});

//add food from market to the cart
app.post('/api/addtocart', (req, res) => {
  setTimeout(function() {
    const sid = req.cookies.sid;
    const curuser = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !curuser) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id, username, foodname, price} = req.body;
    const newObject = {
      id: id,
      seller: username,
      foodname: foodname,
      price: price,
    }

    if(!users.infoOf[curuser].myCart) {
      users.infoOf[curuser].myCart = [];
    }
    const isFoodnameExist = users.infoOf[curuser].myCart.some(item => item.foodname === foodname);
    if(isFoodnameExist) {
      res.status(400).json({ error: 'already-pick' });
      return;
    }
    users.infoOf[curuser].myCart.push(newObject);
    const data = {
      username: curuser,
      id: id,
      seller: username,
      foodname: foodname,
      price: price,
    }
    mongoDB.addToCartDB(data);
    const myCart = users.infoOf[curuser].myCart;
    console.log
    res.json({foodItems, myCart});
  }, 0);
});


//delete items from cart
app.delete('/api/deletefromcart/:foodId', (req, res) => {
  setTimeout(function() {
    const foodId = req.params.foodId-1;
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    const id = users.infoOf[username].myCart[foodId].id;
    const myCart = users.infoOf[username].myCart;
    mongoDB.deleteItemFromCartDB(username,id);
    users.infoOf[username].myCart.splice(foodId, 1);

    res.json({myCart}); 
  },0);
});

//checkout cart (delete)
app.delete('/api/checkoutcart', (req, res) => {
  setTimeout(function() {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    users.infoOf[username].myCart = [];
    const myCart = users.infoOf[username].myCart;
    mongoDB.checkoutDB(username);

    res.json({myCart}); 
  },0);
});

// delete food product form markets
app.delete('/api/food/:foodId', (req, res) => {
  // Get the food ID from the request parameters
  const foodId = parseInt(req.params.foodId);
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  // Find the index of the food item with the specified ID
  const index = foodItems.findIndex((item) => item.id === foodId);
  // If the food item was found, remove it from the array
  if (index !== -1 && foodItems[index].username === username) {
    foodItems.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Food item not found' });
  }
});

// API of my product list ----------------------------------------------------------------
app.get('/api/myproduct', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const resData = users.infoOf[username];
  res.json({resData});
});

app.post('/api/myproduct',upload.single('image'), async (req, res) => {

    try {
      await client.connect();

      const sid = req.cookies.sid;
      const curuser = sid ? sessions.getSessionUser(sid) : '';
      if(!sid || !curuser) {
        res.status(401).json({ error: 'auth-missing' });
        return;
      }

      const {foodname, price} = req.body;
      if(!foodname || foodname === '') {
        res.status(401).json({ error: 'need-foodname' });
        return;
      }
      if(!price || price === '') {
        res.status(401).json({ error: 'need-price' });
        return;
      }
      const result = await client.db('cook2order').collection('myproduct').insertOne({
        user: curuser,
        foodName: foodname,
        price: price,
        imagePath: req.file.path // picture path in server
      });
      res.redirect('/api/session');
      return;
    }

    catch(err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
});

app.put('/api/myproduct', (req, res) => {
  setTimeout(function() {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const { word, address, email, price } = req.body;
    if(!word && word !== '') {
      res.status(400).json({ error: 'required-word' });
      return;
    }
    if(!(/^\d+$/.test(price))) {
      res.status(400).json({ error: 'invalid-price' });
      return;
    }
  
    if(!users.isValidWord(word)) {
      res.status(400).json({ error: 'invalid-word' });
      return;
    }
    
    if(!users.infoOf[username]) {
      users.infoOf[username] = 
      {address: address,
        email: email,
        food: []
      };
    }
    let inputFood = {name: word, price: price};
    users.infoOf[username].food.push({inputFood});
  // ----------------------------------------------------------------
    res.json({ username, storedWord: word });
    
  }, 0);
});
app.delete('/api/myproduct/:foodName', (req, res) => {
  // Get the food ID from the request parameters
  const foodName = parseInt(req.params.foodName);
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  // Find the index of the food item with the specified ID
  const index = users.infoOf[username].food.findIndex((item) => item.name === foodName);
  // If the food item was found, remove it from the array
  if (index !== -1) {
    users.infoOf[username].food.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'My product item not found' });
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));