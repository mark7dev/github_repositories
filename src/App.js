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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getRepos = user => {
    setLoading(true);
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
    setUserData({});
  }

  return (
    <div className="App">
      <div className="container">
          <h1>Github repositories</h1>
          <SearchBar 
            getRepos={getRepos}
          />
          {loading ? <Spinner /> : null}
          { error ? <h3>{errorMessage}</h3> : null}
          { !loading && userData ?
            <div>
              <h3>{user}</h3>
              <h3>{userData.public_repos}</h3>
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
