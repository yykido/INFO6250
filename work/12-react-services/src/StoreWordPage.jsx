import services from './services';
import './StoreWordPage.css'

import Logout from './Logout';
import StoreWord from './StoreWord';

function StoreWordPage({username,onLogout,word,onWord,LoadingOn, LoadingOff}) {
    return (
        <div className="content-page">
            <div className="content-top-container">
                <div className='top-left'></div>
                <div className='storeword-title'>Store Word</div>
                <Logout username={username} onLogout={onLogout} LoadingOn={LoadingOn} LoadingOff={LoadingOff}/>
            </div>
            <StoreWord word={word} onWord={onWord}/>
        </div>
    );
}

export default StoreWordPage;