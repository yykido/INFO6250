const messages = [];

function addMessage( sender, text ) { // Leave this as `sender` - I want to see you solve the name disagreement
  messages.push(
    {
      sender: sender,
      text: text
  });
}

const chat = {
  messages,
  addMessage,
};

module.exports = chat;
