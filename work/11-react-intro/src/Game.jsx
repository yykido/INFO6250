import Logout from './Logout';
import Guess from './Guess';
import './Game.css';

function Game({username,onLogout}) {
    return (
        <div className="content-page">
            <div className="content-top-container">
                <div className='top-left'></div>
                <div className='game-title'>Guess Game</div>
                <Logout username={username} onLogout={onLogout}/>
            </div>
            <Guess/>
        </div>
    );
}

export default Game;