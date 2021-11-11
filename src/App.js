import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [ repo, setRepo ] = useState(0);

  useEffect(() => {
    fetch("/repo").then(res =>res.json()).then(data => {
      setRepo(data.repo);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>the current repo is: {repo} </p>
        <Link to="/heads">Branches</Link>
        <Link to="/pr">Pull Requests</Link>
      </header>
    </div>
  );
}

export default App;
