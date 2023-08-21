import useFetch from "./useFetch";
import noImage from "../img/noImageAvailable.jpg";
import { Link } from 'react-router-dom';

export default function Shows({ showId, watchlist, setWatchlist }) {
  const data = useFetch(`/3/tv/${showId}`);
  const isInWatchlist = !!watchlist.find((item) => item.id === showId && item.type === 'tv');

  const toggleWatchLater = (id) => {
    if (isInWatchlist) {
      setWatchlist(watchlist.filter((item) => !(item.id === id && item.type === 'tv')));
    } else {
      setWatchlist([...watchlist, { id, type: 'tv' }]);
    }
  }

  if (data !== undefined) {
    const poster = data.poster_path === undefined || data.poster_path === null
      ? noImage
      : `${process.env.REACT_APP_POSTER_BASE_URL}${data.poster_path}`;
    return (
      <div>
        <div className="carousel-img-container">
          <Link to={`/show/${data.id}`}>
            <img className="carousel-img" src={poster} alt={data.name} />
          </Link>
          <button className="watch-later-button" onClick={() => toggleWatchLater(data.id)}>{isInWatchlist ? '-' : '+'}</button>
        </div>
        <h3>{data.name}</h3>
        <p>{data.last_air_date}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
