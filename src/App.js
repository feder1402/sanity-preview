import React, { Component } from 'react';
import Preview from './Preview'
import './App.css';

const getIdFromPaqth = () => {
  let params = new URLSearchParams(document.location.search.substring(1));
  return params.get("id"); 
}

class App extends Component {
  render() {
    return (
      <div>
        <header>
        <h1>Card Preview</h1>
        </header>
        <main className="container">
          <Preview id={getIdFromPaqth()} />
        </main>
      </div>
    );
  }
}

export default App;
