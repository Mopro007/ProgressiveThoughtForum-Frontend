import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';

const Carousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Change to the next article every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [articles]);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <div className="carousel-item">
          <div
            className="carousel-image"
            style={{ backgroundImage: `url(${articles[currentIndex].imageUrl})` }}
          >
            <div className="carousel-overlay">
              <h2 className="carousel-title">{articles[currentIndex].title}</h2>
              <Link to={`/article/${articles[currentIndex].id}`} className="carousel-btn">
                Read
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
