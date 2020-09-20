import React from 'react';

const SearchBar = () => {
    return ( 
        <div className="search__container">
            <input
                className="searchInput" 
                type="text"
                placeholder="Search an issue"
            />
            <button>
                <i className="fa fa-search icons" aria-hidden="true"></i>
            </button>
        </div>
    );
}
 
export default SearchBar;