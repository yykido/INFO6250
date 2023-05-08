const loginErrorPage = {
    show: function() {
        return `
        <div>Invalid username: Please enter a valid English name that starts with an uppercase letter and contains only English letters.</div>
    <div>
      <form action="/">
        <div class="bot-flextwo"><button class="back-btn" type="submit">Back</button></div>
      </form> 
    </div>
        `;
    }
}

module.exports = loginErrorPage;