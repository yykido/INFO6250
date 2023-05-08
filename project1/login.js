const loginPage = {
    show: function() {
        return `
        <!doctype html>
        <html>
          <head>
            <title>Login Page</title>
            <link rel="stylesheet" href="/styles/loginpage.css">
          </head>
          <body>
          <div class="login-whole-box">
            <form class="message-area" action="/gamepage" method="POST">
                <div class="login-title">Log In to your Account</div>
                <div class="login-top-box"><input name="username" class="login-text" placeholder="Username"/></div>
                <div class="login-bot-box"><button class="login-btn" type="submit">Log in</button></div>
            </form>
           </div>
           <script src="loginButtonControl.js"></script>
          </body>
        </html>  
        `;
    }
}

module.exports = loginPage;


