import React, {useState} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Repos from './components/Repos';
import './App.css';

function App() {

  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState('');

  const getRepos = user => {
    axios.get(`https://api.github.com/users/${user}/repos?per_page=1000`)
      .then(response => {
        setUser(user);
        setRepositories(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <div className="container">
          {user ?
            <h1>{repositories.length} public repositories of {user}</h1>
            :
            <h1>Github repositories</h1>
          }
          <SearchBar 
            getRepos={getRepos}
          />
          <Repos 
            repositories={repositories}
          />
        </div>
    </div>
  );
}

export default App;
