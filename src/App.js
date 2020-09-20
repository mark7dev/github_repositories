import React, {useState} from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import './App.css';

function App() {

  const [repositories, setRepositories] = useState([]);

  const getRepos = user => {
    axios.get(`https://api.github.com/users/${user}/repos`)
      .then(response => {
        setRepositories(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <div className="container">
          <h1>Github repositories</h1>
          <SearchBar 
            getRepos={getRepos}
          />
        </div>
    </div>
  );
}

export default App;
