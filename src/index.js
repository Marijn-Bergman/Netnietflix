import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/Layout';
import Netnietflix from './components/Home';
import ShowDetails from './components/ShowDetails';
import MovieDetails from './components/MovieDetails';
import WatchLater from './components/WatchLater';
import Search from './components/Search';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Netnietflix />} />
        <Route path="show/:id" element={<ShowDetails />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="watchlater" element={<WatchLater />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
