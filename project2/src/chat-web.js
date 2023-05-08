const chatWeb = {
    chatPage: function(chat,username) {
      return `
            <div id="chat-app">
              <div class="chat-app-left">
                ${chatWeb.getUserList(chat)}
                <div class="username-and-logout">
                  <div class="logout-username">ID: ${username}</div>
                  <button class="logout-btn">log out</button>
                </div>
              </div>
              <div class="chat-app-right">
                ${chatWeb.getMessageList(chat)} 
              </div>
            </div>
    `;
    },
  
    getMessageList: function(chat) {
      return `<ol class="messages">` +
        // Generate the HTML for the list of messages
        Object.values(chat.messages).map( user => `
        <li>
          <div class="message">
            <div class="sender-info">
              <span class="username">${user.sender}</span>
              </div>
              <div class="massage-info">
                <p class="message-text">${user.text}</p>
              </div>
          <div>
        </li>
        `).join('') +
        `</ol>`;
    },
    getUserList: function(chat) {
      return `<ul class="users">` +
      Object.values(chat.users).map( user => `
        <li>
          <div class="user">
            <span >${user}</span>
          </div>
        </li>
      `).join('')+
      `</ul>`;
    },
    getOutgoing: function() {
      // Generate the HTML for a form to send a message
      return `
      <div class="outgoing">
            <div class="flexone"><input name="text" class="to-send" placeholder="Enter message to send"/></div>
            <div class="flextwo"><button class="send-btn" type="submit">Send</button></div>
        </div>
      `
    }
  };
  module.exports = chatWeb;