import React, { useReducer, useState, useEffect } from "react";
import useFetch from "./useFetch";
import Carousel from "nuka-carousel";
import Shows from './Shows';
import Movies from './Movies';
import ShowDetails from './ShowDetails';
import MovieDetails from './MovieDetails';
import WatchLater from './WatchLater';

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_MOVIE':
      return { type: 'movie', id: action.id };
    case 'SHOW_TV':
      return { type: 'tv', id: action.id };
    default:
      return state;
  }
}

export default function Netnietflix() {
  const [state, dispatch] = useReducer(reducer, { type: null, id: null });
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchLater')) || []);
  const tvShowsData = useFetch("/3/tv/popular");
  const moviesData = useFetch("/3/movie/popular");

  const showMovie = (id) => {
    dispatch({ type: 'SHOW_MOVIE', id });
  }

  const showTV = (id) => {
    dispatch({ type: 'SHOW_TV', id });
  }

  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchlist));
  }, [watchlist]);

  if (state.type === 'movie') {
    return <MovieDetails id={state.id} />;
  }

  if (state.type === 'tv') {
    return <ShowDetails id={state.id} />;
  }

  return (
    <div style={{ marginLeft: '210px' }}>
      <div className="carousel">
        <h1>Popular TV Shows</h1>
        <Carousel slidesToShow={5} wrapAround={true}>
          {
            (tvShowsData.results || []).map((show, index) => (
              <Shows key={index} showId={show.id} onClick={() => showTV(show.id)} watchlist={watchlist} setWatchlist={setWatchlist} />
            ))
          }
        </Carousel>
        <br />
        <h1>Popular Movies</h1>
        <Carousel slidesToShow={5} wrapAround={true}>
          {
            (moviesData.results || []).map((movie, index) => (
              <Movies key={index} movieId={movie.id} onClick={() => showMovie(movie.id)} watchlist={watchlist} setWatchlist={setWatchlist} />
            ))
          }
        </Carousel>
        <br />
        {watchlist.length > 0 && (
          <>
            <h1>Watch Later</h1>
            <Carousel slidesToShow={5} wrapAround={watchlist.length >= 5}>
              {
                watchlist.map((item, index) => (
                  <WatchLater key={index} item={item} onClick={item.type === 'movie' ? showMovie : showTV} watchlist={watchlist} setWatchlist={setWatchlist} />
                ))
              }
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}
