import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from 'react-router-dom';
import './ShowDetails.css';
import NoImageAvailable from '../img/noImageAvailable.jpg';

export default function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const posterBaseUrl = process.env.REACT_APP_POSTER_BASE_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        setShow(result.data);
        fetchSeason(result.data.seasons[0].season_number);
      } catch (error) {
        console.error("error");
      }
    };
    fetchData();
  }, [id]);

  const fetchSeason = async (season_number) => {
    try {
      const result = await axios(
        `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${apiKey}`
      );
      setEpisodes(result.data.episodes);
    } catch (error) {
      console.error("error");
    }
  };

  const handleSeasonChange = (event) => {
    const season_number = event.target.value;
    setSelectedSeason(season_number);
    fetchSeason(season_number);
  };

  const rating = show.vote_average ? Math.round(show.vote_average * 10) : 0;

  return (
    <div>
      <div className="header">
      </div>
      <h1>TV Show</h1>
      <hr />
      <div className="show-details">
        <img className="show-poster" src={`${posterBaseUrl}${show.poster_path}`} alt={show.name} />
        <div className="show-info">
          <h2>{show.name} ({show.first_air_date?.substring(0, 4)})</h2>
          <p><strong>Genre: </strong>{show.genres && show.genres.map(genre => genre.name).join(', ')}</p>
          <div className="show-rating">
            <CircularProgressbar value={rating} text={`${rating}%`} />
          </div>
          <h3>Overview:</h3>
          <p>{show.overview}</p>
          <h3>Creators:</h3>
          <p>{show.created_by && show.created_by.map(creator => creator.name).join(', ')}</p>
          <select value={selectedSeason} onChange={handleSeasonChange}>
            {show.seasons && show.seasons.map((season, index) =>
              <option key={index} value={season.season_number}>{'Season ' + season.season_number}</option>
            )}
          </select>
          <div className="episodes-list">
            {episodes.map((episode, index) => (
              <div className="episode-card" key={index}>
                <img className="episode-poster" src={episode.still_path ? `${posterBaseUrl}${episode.still_path}` : NoImageAvailable} alt={episode.name} />
                <div className="episode-info">
                  <h4>{episode.episode_number}. {episode.name}</h4>
                  <p>{episode.overview}</p>
                  <p>{episode.air_date}</p>
                  <p>{episode.runtime} min</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
