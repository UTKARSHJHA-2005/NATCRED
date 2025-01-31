import React, { useState, useEffect } from 'react';
import './Loader.css';
import logo from './assets/logo2.png';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="glow-container">
        <div className="orbit"></div>
        <div className="orbit2"></div>
        <div className="image-container">
          <img src={logo} alt="Loading" className="logo-image" />
          <div className="logo-overlay"></div>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${progress}%`,
              boxShadow: `0 0 15px #00ff88`
            }}
          >
            <div className="progress-shine"></div>
          </div>
        </div>
        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default Loader;