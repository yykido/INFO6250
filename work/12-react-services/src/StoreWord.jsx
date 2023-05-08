import { useState } from 'react';
import services from './services';

function StoreWord({word,onWord}) {
    const [localword, setWord] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return(
        <div className='content-box'>
            <div className='input-btn-box'>
                <div className='inside-input-btn-box'>
                    <input className='set-input' type="text" placeholder='store your word' value={localword} onInput={(e) => setWord(e.target.value) }/>
                    <button className='set-btn'
                    onClick={
                        () => {
                            services.setWord(localword)
                            .then(data => {
                                onWord(data.storedWord);
                                setWord('');
                                setErrorMessage('');
                             
                            })
                            .catch(err => {
                                console.error(err);
                                setWord('');
                                setErrorMessage('invalid word');
                            })
                        }
                    }>Set</button>
                    <div className='error-message'>{errorMessage}</div>
                </div>
            </div>
            <div className='subcontent-box'>
                <div>
                    <div className='storeword-subtitle'>The Word You Stored</div>
                    <div>{word}</div>
                </div>
            </div>

        </div>

    );
}

export default StoreWord;