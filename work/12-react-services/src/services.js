const fetchLogin = function(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
      },
      body: JSON.stringify( { username } ),
    })
    // fetch() rejects on network error
    // So we convert that to a formatted error object
    // so our caller can handle all "errors" in a similar way
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  // response.ok checks the status code from the service
        // This service returns JSON on errors,
        // so we use that as the error object and reject
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
  
  const Logout = function() {
    return fetch('/api/session/', {
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
  
  const displayWord = function() {
    return fetch('/api/word/')
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) { 
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); // happy status code means resolve with data from service
    });
  
  }
  
  const setWord = function(word) {
    return fetch('/api/word/', {
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
  
  module.exports = {
    fetchLogin,
    checkIfLogin,
    Logout,
    displayWord,
    setWord
  }