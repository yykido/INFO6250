const homePage = {
    show: function(username,data,errorEl,congEl,targetWordEl) {
        return `
        <!doctype html>
           <html>
         <head>
           <title>Data</title>
           <link rel="stylesheet" href="styles/homepage.css">
           <link rel="stylesheet" href="styles/loginpage.css">
         </head>
         <body>
           <div class = "datapage-top">
             <div class="top-left-box"></div>
             <div class="top-mid-box">Word Guess Challenge</div>
             <div class="top-righ-box">
                 <form action="/logout" method="POST">
                   <div>Account: ${username}</div>
                   <div><button class="logout-btn" type="submit">Log out</button></div>
                 </form> 
             </div>
           </div>
           <div class="datapage-mid">
             <div class="background">
                 <div class="mid-mid-box">
                     <div class="mid-mid-box-flex1">
                         <div id="possible">POSSIBLE</div>
                         <div id="possiblebox">${homePage.getPossibleWords(username,data)} </div>
                     </div>
                     <div class="mid-mid-box-flex2"></div>
                     <div class="mid-mid-box-flex3">
                         <div id="guess">GUESSED</div>
                         <div id="guessbox">${homePage.getGuessedWords(username,data)} </div>
                     </div>
                 </div>
                 <div class="mid-bot-box"></div>
             </div>
           </div>
           <div class="datapage-bot">
               <div class="bot-left">
                   <div class="words-statics">
                       <div class="validguessnumber">valid guess: ${data[username].count}</div>
                       <div class="similarword">most recent word: ${data[username].mostRecentWord}</div>
                       <div class="mostmatch-number">number of matches: ${data[username].numberMatch}</div>
                   </div>
                   <div class="input-and-buttons">
                       <form class="put-area" action="/guess" method="POST">
                           <input class="username" type="hidden" name="username" value="${username}">
                           <div class="bot-flexone"><input name="word" class="put-text" placeholder="Your word"/></div>
                           <div class="bot-flextwo"><button id="guess-btn" type="submit">GUESS</button></div>
                           <div class="error">${errorEl.outerHTML}</div>
                       </form> 
                       <form class="startanewgame" action="/startanewgame" method="POST">
                           <input class="username" type="hidden" name="username" value="${username}">
                           <button class="restart-btn" type="submit">START NEW GAME</button>
                       </form>
                   </div>
               </div>
               <div class="bot-right">
                   <div id="history">HISTORY</div>
                   <div id="historybox">
                       <div class="history-statics">
                           ${homePage.getHistoryIndex(username,data)}
                           ${homePage.getHistoryGuess(username,data)}
                       </div>
                   </div>
               </div>
           </div>
           <div class="congrats-box">
                <div id="congrats">${congEl.outerHTML}</div>
                <div class="targetWord"> ${targetWordEl.outerHTML}</div>
           </div>

         </body>
         </html>  
        `;
    },

    getHistoryGuess: function(username,data) {
        return `<div class="historyguess">` +`<div class="historyinboxtitle">Valid Guess</div >`+
        Object.values(data[username].preGame).map( word => `
        <li>
            <div class="historyguesscount">
                <span >${word} valid counts</span>
            </div>
        </li>
        `).join('') +
        `</div>`;
    },
    
    getHistoryIndex: function(username,data) {
        return `<div class="historyguess">` +`<div class="historyinboxtitle">Games</div >`+
        Object.values(data[username].preGame).map( (_, index) => `
        <li>
            <div class="historyguesscount">
                <span >Game${index+1}</span>
            </div>
        </li>
        `).join('') +
        `</div>`;
    },
    
    getGuessedWords: function(username,data) {
        const guessWordsList = Object.values(data[username].preGuess);
        const guessWordsMatchesList = Object.values(data[username].preGuessMaches);
    
        return `<div class="guessed-words whiteback">` +
        guessWordsList.map( (word,index )=> `
            <span >${word}</span>
            <span class="matchnumber">${guessWordsMatchesList[index]}</span>
        `).join('') +
        `</div>`;
    },
    
    getPossibleWords: function(username,data) {
        return `<div class="remaining-words whiteback">` +
        Object.values(data[username].remaining).map( word => `
            <span >${word}</span>
        `).join('') +
        `</div>`;
    }
}


module.exports = homePage;
