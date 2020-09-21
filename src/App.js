import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Repos from './components/Repos';
import Spinner from './components/Spinner';
import './App.scss';

function App() {

  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(Boolean);
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const getRepos = user => {
    setLoading(true);
    setError(false);
    setStates();
    axios.get(`https://api.github.com/users/${user}`)
      .then(response => {
        setUser(user);
        setUserData(response.data);
        axios.get(`https://api.github.com/users/${user}/repos?per_page=1000`)
          .then(response => {
            setLoading(false);
            setRepositories(response.data)
          })
          .catch(error => {
            setLoading(false);
            setError(true);
            setStates();
            setErrorMessage(error.response.data.message);
          })
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        setStates();
        setErrorMessage(error.response.data.message);
      })
  }

  const setStates = () => {
    setRepositories([]);
    setUser('');
    setUserData(null);
  }

  useEffect(() => {
    const body = document.body
    const toggle = document.querySelector('.toggle-inner')
    
    if( darkMode === true ) {
      body.classList.add('dark-mode')
      toggle.classList.add('toggle-active')
    } else {
      body.classList.remove('dark-mode')
      toggle.classList.remove('toggle-active')
    }
  }, [darkMode])

  return (
    <div className="App">
      <div className="toogle__container">
        <div
          id="toggle"
          onClick={() => darkMode === false ? setDarkMode(true) : setDarkMode(false)}
        >
          <div className="toggle-inner"/>
        </div>
      </div>
      <header className="title__container">
        <h1>Github repositories</h1>
        <SearchBar 
          getRepos={getRepos}
        />
      </header>
      <div className="data__container">
        {loading ? <Spinner /> : null}
        { error ? 
          <h1 className="error">{errorMessage}</h1>
          : null }
        { !loading && userData ?
          <div>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              <h3>{user} <span>
                  <i class="fa fa-github" aria-hidden="true"></i>
                </span>
              </h3>
            </a>
            <h3>Total repositories: {userData.public_repos}</h3>
          </div>
          : null
        }
        <Repos 
          repositories={repositories}
        />
      </div>
    </div>
  );
}

export default App;
