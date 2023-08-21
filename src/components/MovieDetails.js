import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';
import Carousel from 'nuka-carousel';
import noImageAvailable from '../img/noImageAvailable.jpg';
import ReactPlayer from 'react-player';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_API_KEY;
  const posterBaseUrl = process.env.REACT_APP_POSTER_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResult = await axios(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(movieResult.data);

        const castResult = await axios(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        setCast(castResult.data.cast);

        const videoResult = await axios(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        const officialTrailer = videoResult.data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        setVideos(officialTrailer ? [officialTrailer] : []);

        const similarMoviesResult = await axios(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
        );
        setSimilarMovies(similarMoviesResult.data.results);
      } catch (error) {
        console.error("error");
      }
    };
    fetchData();
  }, [id, apiKey]);

  const rating = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  }

  return (
    <div>
      <div className="header">
      </div>
      <h1>Movie</h1>
      <hr />
      <div className="movie-details">
        <img src={`${posterBaseUrl}${movie.poster_path}`} alt={movie.title} />
        <div className="movie-info">
          <h2>{movie.title} ({movie.release_date?.substring(0, 4)})</h2>
          <p><strong>Genre: </strong>{movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
          <div className="movie-rating">
            <CircularProgressbar value={rating} text={`${rating}%`} />
          </div>
          <h3>Overview:</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className="carousel">
        <h1>Cast</h1>
        <Carousel slidesToShow={5} wrapAround={true}>
          {
            (cast || []).map((actor, index) => (
              <div key={index}>
                <img className="carousel-img" src={actor.profile_path ? `${posterBaseUrl}${actor.profile_path}` : noImageAvailable} alt={actor.name} />
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </div>
            ))
          }
        </Carousel>
      </div>
      <div className="videos">
        <h1>Trailer</h1>
        {
          videos.map((video, index) => (
            <ReactPlayer
              key={index}
              url={`https://www.youtube.com/watch?v=${video.key}`}
            />
          ))
        }
      </div>
      <div className="carousel">
        <h1>Similar Movies</h1>
        <Carousel slidesToShow={5} cellAlign="left" wrapAround={true}>
          {
            (similarMovies || []).map((similarMovie, index) => (
              <div
                key={index}
                onClick={() => handleMovieClick(similarMovie.id)}
                className="similar-movie"
              >
                <img className="carousel-img" src={similarMovie.poster_path ? `${posterBaseUrl}${similarMovie.poster_path}` : noImageAvailable} alt={similarMovie.title} />
                <h3>{similarMovie.title}</h3>
                <p>{similarMovie.release_date}</p>
              </div>
            ))
          }
        </Carousel>
      </div>
    </div>
  );
}
