import React, { useState, useEffect } from 'react';
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
    <div style={styles.loaderContainer}>
      <div
        style={{
          ...styles.imageContainer,
          boxShadow: `0 0 ${10 + progress * 0.5}px ${5 + progress * 0.2}px rgba(76, 175, 80, ${0.4 + progress / 200})`, // Dynamic glow
        }}
      >
        <img
          src={logo}
          alt="Loading"
          style={styles.image}
        />
      </div>
      <div
        style={{
          ...styles.progressBar,
          borderColor: `rgba(76, 175, 80, ${0.3 + progress / 150})`, 
          boxShadow: `0 0 10px rgba(76, 175, 80, ${0.3 + progress / 150})`, 
        }}
      >
        <div style={{ ...styles.progress, width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '220px', 
    height: '220px',
    borderRadius: '50%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    transition: 'box-shadow 0.3s ease', 
  },
  image: {
    width: '200px',
    height: '200px',
  },
  progressBar: {
    width: '40%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '20px auto',
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid rgba(0, 0, 0, 0.3)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  },
};

export default Loader;
