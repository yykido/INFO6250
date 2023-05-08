function Logout({username,onLogout}) {
    return(
        <div className="username-logout">
            <div className="content-username">
                {username}
            </div>
            <div className="logout">
                <button className="logout-btn" onClick={onLogout}>logout</button>
            </div>
        </div>
    )
}

export default Logout;