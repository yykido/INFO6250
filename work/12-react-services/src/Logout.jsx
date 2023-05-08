import services from './services';

function Logout({username,onLogout}) {
    return(
        <div className="username-logout">
            <div className="content-username">
                {username}
            </div>
            <div className="logout">
                <button 
                className="logout-btn" 
                onClick={
                    () => services.Logout()
                    .then(data => {
                        onLogout()
                    })
                    .catch(error => {
                        console.error(error);
                    })
                }>logout</button>
            </div>
        </div>
    )
}

export default Logout;