const layout = {
    login: function() {
        return `
        <div class="login-page">
            <div id="login-error"></div>
            <div class="input-box"><input id="username" type="text" placeholder="username"></div>
            <div class="button-box"><button class="login-btn">Login</button></div>
        </div>
        `
    },
}

module.exports = layout;