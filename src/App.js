import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ repo, set_repo ] = useState(0);

  useEffect(() => {
    fetch("/repo").then(res =>res.json()).then(data => {
      set_repo(data.repo);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
    </a>
      <p>the current repo is: {repo} </p>
      </header>
    </div>
  );
}

export default App;