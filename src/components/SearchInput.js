import { useState } from 'react';
import './search.css';
import searchimg from '../img/search-white.png'

export default function SearchInput({ onItemClick, placeholder }) {

    const [searchInput, setSearchInput] = useState("");

    function handleSearchClick() {
        onItemClick(searchInput);
        setSearchInput('');
    }

    const handleKeypress = e => {
        if (e.keyCode === 13) {
            handleSearchClick();
        }
    }

    return (
        <div className="search">
            <input className="searchTerm" placeholder={placeholder} value={searchInput} type="text"
                onKeyDown={handleKeypress}
                onChange={(e) => setSearchInput(e.target.value)} />
            <button className="searchButton" onClick={handleSearchClick}>
                <img className="searchImg" src={searchimg} alt="Search" />
            </button>
        </div>
    );
}
