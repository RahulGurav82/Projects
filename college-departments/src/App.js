import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <img src="/CollegeBanner.jpg" alt="College Logo" className="banner-image" />
      </div>
      <div className="grid-container">
        <div className="grid-item">CS</div>
        <div className="grid-item">IT</div>
        <div className="grid-item">BIO TECH</div>
        <div className="grid-item">BSC</div>
        <div className="grid-item">PHYSICS</div>
        <div className="grid-item">BCOM</div>
      </div>
    </div>
  );
}

export default App;
