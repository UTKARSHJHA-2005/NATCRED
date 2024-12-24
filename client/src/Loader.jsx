import React, { useState, useEffect } from 'react';
import logo from './assets/logo2.png'

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
      <img
        src={logo} 
        alt="Loading"
        style={styles.image}/>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progress}%` }}></div>
      </div>
    </div>
  );
};
const styles = {
  loaderContainer: {
    height:'100%',
    marginTop:'10%',
  },
  image: {
    width: '200px',
    height: '200px',
    marginLeft:'590px',
    marginBottom: '20px',
  },
  progressBar: {
    width: '40%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '10px auto',
    position: 'relative',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  },
};

export default Loader;