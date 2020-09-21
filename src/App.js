import React, {useState, Fragment} from 'react';
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
            console.log(error);
          })
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        setStates();
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
          { !loading && userData ?
            <div>
              <h3>{userData.login}</h3>
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
