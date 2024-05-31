import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

// Here is your key: a37eb5d2
const API_URL = 'http://www.omdbapi.com?apikey=a37eb5d2'

const App = () => {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Response === 'True'){
            setMovies(data.Search)
        }else{
            setMovies([])
        }

    }
    return (
        <div className="app">
            <h1>Movie World</h1>
            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter'){
                            searchMovies(searchTerm);
                    }}}
                />
                <img src={SearchIcon} alt="search"
                    onClick={()=> searchMovies(searchTerm)}
                />
            </div>
            {
                movies != null ?
                    movies.length > 0 ?
                        <div className="container">
                        {
                            movies.map((movie) => (<MovieCard movieData={movie}/>))
                        }
                        </div> :
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                : <div className="empty">

                    </div>
            }
        </div>
    )
}

export default App;
