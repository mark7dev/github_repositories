import React from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
          <h1>Github repositories</h1>
          <SearchBar />
        </div>
    </div>
  );
}

export default App;
