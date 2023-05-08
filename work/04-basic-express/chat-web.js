const chatWeb = {
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
          </div>
            ${chatWeb.getOutgoing(chat)}
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      Object.values(chat.messages).map( user => `
      <li>
        <div class="message">
          <div class="sender-info">
              <img class="avatar" alt="avatar of ${user.sender.toLowerCase()}" src="/images/avatar-${user.sender.toLowerCase()}.jpg"/>
            </div>
            <div class="massage-info">
              <span class="username">${user.sender}</span>
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
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in
    // Generate the HTML for a form to send a message
    return `
    <div class="outgoing">
        <form class="message-area" action="/chat" method="POST">
          <input type="hidden" name="username" value="Mao">
          <div class="flexone"><input name="text" class="to-send" placeholder="Enter message to send"/></div>
          <div class="flextwo"><button type="submit">Send</button></div>
        </form>
      </div>
    `
  }
};
module.exports = chatWeb;
