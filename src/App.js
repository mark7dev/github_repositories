import React, {useState} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Repos from './components/Repos';
import Spinner from './components/Spinner';
import './App.css';

function App() {

  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(Boolean);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="App">
      <div className="container">
          <div className="title">
            <h1>Github repositories</h1>
            <SearchBar 
              getRepos={getRepos}
            />
          </div>
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
    </div>
  );
}

export default App;
