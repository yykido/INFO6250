import services from './services';

function Searchbar({username,onLogout}) {


    return(
        <div className="searchbar">
            <input type="text" />
            <button onClick={services.getDataFromDB}>search</button>
        </div>
    )
}

export default Searchbar;