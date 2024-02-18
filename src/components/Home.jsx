import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

// const [isHovered, setIsHovered] = useState(false);
const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // buttonStyle: {
  //   transform: isHovered ? 'scale(1.8)' : 'scale(1)',
  //   transition: 'transform 0.3s ease-in-out',
  // },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>I can build your custom &nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <h2 style={styles.inlineChild}>...really fast</h2>
        {/* <div style={{ flexDirection: 'row' }}> */}
        {/* <Link to="/your-internal-link">
            <button
              type="button"
              style={{
                ...styles.buttonStyle,
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
              }}
            >
              Learn More
            </button>
          </Link> */}
        {/* <a href="https://your-external-link.com" target="_blank" rel="noopener noreferrer">
    <button style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }}>
      Book Here
    </button>F
  </a> */}
        {/* </div> */}
        <Social />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
