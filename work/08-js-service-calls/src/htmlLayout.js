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
    word: function(username,word) {
        return `
        <div class="top">
            <div class="top-left"></div>
            <div class="top-mid">Word Storage</div>
            <div class="top-right">
                <div class="logedin-username">account: ${username}</div>
                <div class="logout-btn-container"><button class="logout-btn">log out</button></div>
            </div>
        </div>
        <div class="down">
            <div class="down-container">
                <div class="word-part">
                    <div class="storedWord-title">Your word: ${word}</div>
                </div>
                <div>
                    <div class="your-word-container"><input class="set-input" type="text" placeholder="new word"><div id="text-error"></div></div>
                    <div><button class="set-btn">Set</button></div>
                </div>
            </div>
        </div>
        `
    }
}

module.exports = layout;