import { useState } from "react";
import useFetch from "./useFetch";
import SearchInput from './SearchInput';
import noImage from "../img/noImageAvailable.jpg";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);

    const data = useFetch(searchQuery ? `/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&language=en-US&page=${page + 1}` : '');

    const total_pages = data ? data.total_pages : 0;

    function handleSearchClick(value) {
        setSearchQuery(value);
        setPage(0);
    }

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    return (
        <div>
            <h1>Search</h1>
            <SearchInput placeholder="Search here" onItemClick={handleSearchClick} />
            <div className="SearchWrapper">
                {data && data.results && data.results.filter(item => item.media_type !== "person").slice(0, 8).map((item, index) => {
                    let title = item.title || item.name;
                    let releaseDate = item.release_date || item.first_air_date;
                    let posterPath = item.poster_path
                        ? `${process.env.REACT_APP_POSTER_BASE_URL}${item.poster_path}`
                        : noImage;
                    let linkPath = item.media_type === "movie"
                        ? `/movie/${item.id}`
                        : `/show/${item.id}`;
                    return (
                        <Link className="SearchItem" to={linkPath} key={index}>
                            <div>
                                <img className="search-img" src={posterPath} alt={title} />
                                <h3>{title}</h3>
                                <p>{releaseDate}</p>
                            </div>
                        </Link>
                    );
                })}


            </div>
            {searchQuery && (
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={total_pages}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"navigationDisabled"}
                    activeClassName={"navigationActive"}
                    forcePage={page}
                />
            )}

        </div>
    )
}

export default Search;
