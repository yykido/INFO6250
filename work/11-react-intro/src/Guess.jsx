import { useState } from "react";
import compare from './compare';

function Guess() {
    const [word, setWord] = useState('');
    const [result, setResult] = useState('');

    return(
        <div className="game-container">
            <input className="guess-input" type="text" value={word} onInput={(e) => setWord(e.target.value)}/>
            <button className="guess-btn" type="button" onClick={() => setResult(compare.doCompare(word))}>submit</button>
            <div className="result-txt">{result}</div>
        </div>
    );

}

export default Guess;

