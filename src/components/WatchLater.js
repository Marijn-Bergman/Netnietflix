import useFetch from "./useFetch";
import noImage from "../img/noImageAvailable.jpg";
import { Link } from 'react-router-dom';

export default function WatchLater({ item, watchlist, setWatchlist }) {
  const data = useFetch(`/3/${item.type}/${item.id}`);

  const removeFromWatchLater = () => {
    setWatchlist(watchlist.filter((watchItem) => !(watchItem.id === item.id && watchItem.type === item.type)));
  }

  if (data && data.poster_path !== null) {
    const poster = data.poster_path === undefined ? noImage : "https://image.tmdb.org/t/p/w500" + data.poster_path;
    const title = item.type === 'movie' ? data.title : data.name;
    const linkPath = item.type === 'tv' ? '/show/' : '/movie/';

    return (
      <div>
        <div className="carousel-img-container">
          <Link to={`${linkPath}${item.id}`}>
            <img className="carousel-img" src={poster} alt={title} />
          </Link>
          <button className="watch-later-button" onClick={removeFromWatchLater}>-</button>
        </div>
        <h3>{title}</h3>
        <p>{item.type === 'movie' ? data.release_date : data.last_air_date}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
