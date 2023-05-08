const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://yystephan:AI18dRYE5o7Z9he8@yykido.9xocqky.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getUserData() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
      // console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const collection = client.db("cook2order").collection("user");
      
      const cursor = collection.find({});
      const documents = await cursor.toArray();

      const cartcollection = client.db("cook2order").collection("userCart");
      const cartcursor = cartcollection.find({});
      const cartdocuments = await cartcursor.toArray();

      const marketcollection = client.db("cook2order").collection("foodInMarket");
      const marketcursor = marketcollection.find({});
      const marketdocuments = await marketcursor.toArray();

      const productcollection = client.db("cook2order").collection("myproduct");
      const productcursor = productcollection.find({});
      const prodctdocument = await productcursor.toArray();


      const data = [];
      data.push(documents);
      data.push(cartdocuments);
      data.push(marketdocuments);
      data.push(prodctdocument);
      return data;
    } catch (error) {
      console.error(error);
    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

async function insertUserData(data) {
    try {
      await client.connect();
      const database = client.db("cook2order"); 
      const collection = database.collection("user"); 
      const result = await collection.insertOne(data); 
      console.log(`Inserted ${result.insertedCount} documents into the 'user' collection.`);
    } catch (error) {
      console.error(error);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close(); 
    }
}

async function insertFoodToMarket() {
  try {
    await client.connect();
    const database = client.db("cook2order");
    const collection = database.collection("foodInMarket");
    // const documents = [
    //   { url: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg',
    //     id: 'C008',
    //     username: 'wenny',
    //     foodname: 'cake',
    //     price: '6.00',
    //     address: '8th ave',
    //     email: 'w.xe@163.com',
    //     status: true
    //   }
    // ];
  
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted into the collection`);
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}


async function addToCartDB(data) {
  try {
    await client.connect();
    const database = client.db("cook2order"); 
    const collection = database.collection("userCart"); 
    const result = await collection.insertOne(data); 
    console.log(`Inserted ${result.insertedCount} documents into the 'user' collection.`);
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}

async function getCartData() {
  try {
    await client.connect();
    const collection = client.db("cook2order").collection("userCart");
    const cursor = collection.find({});
    const documents = await cursor.toArray();
    console.log(documents);
    return documents;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function deleteItemFromCartDB(username,id) {
  try {
    await client.connect();
    const database = client.db("cook2order"); 
    const collection = database.collection("userCart"); 
    const result = await collection.deleteMany({ username: username, id: id });
    console.log(`Deleted ${result.deletedCount} documents from the 'userCart' collection`);
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}

async function checkoutDB(username,id) {
  try {
    await client.connect();
    const database = client.db("cook2order"); 
    const collection = database.collection("userCart"); 
    const result = await collection.deleteMany({ username: username});
    console.log(`Deleted ${result.deletedCount} documents from the 'userCart' collection`);
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}

module.exports = {
  getUserData,
  insertUserData,
  addToCartDB,
  deleteItemFromCartDB,
  getCartData,
  insertFoodToMarket,
  checkoutDB
};
  