const loginPage = {
    show: function() {
        return `
        <!doctype html>
        <html>
          <head>
            <title>Login Page</title>
            <link rel="stylesheet" href="style.css">
          </head>
          <body>
          <div >
            <form class="message-area" action="/datapage" method="POST">
                <div class="login-top-box"><input name="username" class="login-text" placeholder="Username"/></div>
                <div class="login-bot-box"><button class="login-btn" type="submit">Log in</button></div>
            </form>
           </div>
          </body>
        </html>  
        
        `;
    }
}

module.exports = loginPage;


