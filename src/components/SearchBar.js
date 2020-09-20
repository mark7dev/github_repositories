import React, { useState } from 'react';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(e.target.value)
    }

    return ( 
        <div className="search__container">
            <input
                name="searchInput"
                className="searchInput" 
                type="text"
                placeholder="User"
                onChange={handleChange}
            />
            <button
                disabled={search === ''}
            >
                <i className="fa fa-search icons" aria-hidden="true"></i>
            </button>
        </div>
    );
}
 
export default SearchBar;