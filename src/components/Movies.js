import useFetch from "./useFetch";
import noImage from "../img/noImageAvailable.jpg";
import { Link } from 'react-router-dom';

export default function Movies({ movieId, watchlist, setWatchlist }) {
    const data = useFetch(`/3/movie/${movieId}`);
    const isInWatchlist = !!watchlist.find((item) => item.id === movieId && item.type === 'movie');

    const toggleWatchLater = (id) => {
        if (isInWatchlist) {
            setWatchlist(watchlist.filter((item) => !(item.id === id && item.type === 'movie')));
        } else {
            setWatchlist([...watchlist, { id, type: 'movie' }]);
        }
    }

    if (data !== undefined) {
        const poster = data.poster_path === undefined || data.poster_path === null
            ? noImage
            : `${process.env.REACT_APP_POSTER_BASE_URL}${data.poster_path}`;

        return (
            <div>
                <div className="carousel-img-container">
                    <Link to={`/movie/${data.id}`}>
                        <img className="carousel-img" src={poster} alt={data.title} />
                    </Link>
                    <button className="watch-later-button" onClick={() => toggleWatchLater(data.id)}>{isInWatchlist ? '-' : '+'}</button>
                </div>
                <h3>{data.title}</h3>
                <p>{data.release_date}</p>
            </div>
        );
    }
    else {
        return <></>;
    }
}
