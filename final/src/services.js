const fetchSignup = function(username,password,email,address) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { username,password,email,address } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  // response.ok checks the status code from the service
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
}
  // '/api/session/'
const checkIfLogin = function() {
  return fetch('/api/session/')
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

// login method
const fetchLogin = function(username,password) {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { username,password} ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  // response.ok checks the status code from the service
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json();
  });
}
// user log out  
const Logout = function() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json', 
    }
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}
//   get food in the market from server
const displayFoods = function() {
  return fetch('/api/food/')
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });

}

// add food to the cart
const addToCart = function(id, username, foodname, price) {
  return fetch('/api/addtocart/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { id, username, foodname, price} ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}
// delete an item from cart
const deleteFromCart = function(foodId) {
  return fetch(`/api/deletefromcart/${foodId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to delete item from cart.');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error deleting item from cart:', error);
    throw error;
  });
}

const checkoutCart = function() {
  return fetch('/api/checkoutcart/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    }
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}


// upload food to the market
const addFood = function(word) {
  return fetch('/api/uploadfood/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { word} ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}

const modifyFood = function(word) {
  return fetch('/api/food/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify( { word} ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}
const deleteFood = function(foodId) {
  return fetch(`/api/food/${foodId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}

const getDataFromDB =  function() {
  return fetch('/api/getdata/')
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

// create myfood
const createMyFood = function(foodname, price, image) {
  return fetch('/api/myproduct/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // set this header when sending JSON in the body of request
    },
    // body: JSON.stringify( { foodname,price,image} ),
    body: JSON.stringify( {foodname, price ,image} ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) { 
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}




module.exports = {
  fetchSignup,
  fetchLogin,
  checkIfLogin,
  Logout,
  displayFoods,
  addFood,
  modifyFood,
  deleteFood,
  addToCart,
  checkoutCart,
  deleteFromCart,
  getDataFromDB,
  createMyFood
}