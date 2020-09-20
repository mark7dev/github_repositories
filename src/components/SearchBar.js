import React, { useState } from 'react';

const SearchBar = ({getRepos}) => {

    const [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const onClickToGetRepos = () => {
        getRepos(search);
        setSearch('');
    }

    const onEnterKeyPress = e => {
        if(e.key === 'Enter') {
            onClickToGetRepos();
        }
    }

    return ( 
        <div className="search__container">
            <input
                name="searchInput"
                value={search}
                className="searchInput" 
                type="text"
                placeholder="User"
                onChange={handleChange}
                onKeyPress={onEnterKeyPress}
            />
            <button
                disabled={search === ''}
                onClick={onClickToGetRepos}
            >
                <i className="fa fa-search icons" aria-hidden="true"></i>
            </button>
        </div>
    );
}
 
export default SearchBar;