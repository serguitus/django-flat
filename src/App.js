import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [ repo, setRepo ] = useState(0);
  const [ author, setAuthor ] = useState(0);

  useEffect(() => {
    fetch("/repo").then(res =>res.json()).then(data => {
      setRepo(data.repo);
      setAuthor(data.author);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>the current repo is: {repo} </p>
        <p>active committer is: {author} </p>
        <Link to="/heads">Branches</Link>
        <Link to="/pr">View Pull Requests</Link>
        <Link to="/pr/add">Add Pull Requests</Link>
      </header>
    </div>
  );
}

export default App;
