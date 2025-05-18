import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';

const Carousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Navigation functions

  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-rotate effect
  useEffect(() => {
    if (articles.length > 1) { // Only auto-rotate if there's more than one article
      const interval = setInterval(() => {
        goToNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [articles.length]);

  if (articles.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-placeholder">
          No articles available
        </div>
      </div>
    );
  }

  // Cloudinary image transformations (optional)
  const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    // Add Cloudinary transformations if needed (e.g., resize, quality, format)
    if (url.includes('res.cloudinary.com')) {
      return url.replace('/upload/', '/upload/w_1000,h_500,c_fill,q_auto,f_auto/');
    }
    return url;
  };

  return (
    <div className="carousel-container">
      {articles.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={goToPrev}>&#10094;</button>
          <button className="carousel-btn next" onClick={goToNext}>&#10095;</button>
        </>
      )}
      
      <div className="carousel-slide">
        {articles.map((article, index) => (
          <div 
            key={article.id || index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <div
              className="carousel-image"
              style={{ 
                backgroundImage: `url(${getOptimizedImageUrl(article.banner || article.imageUrl)})`,
                display: index === currentIndex ? 'block' : 'none'
              }}
            >
              <div className="carousel-overlay">
                <h2 className="carousel-title">{article.title}</h2>
                <Link 
                  to={`/article/${article._id || index}`} 
                  className="carousel-read-btn"
                >
                  اقراء المزيد
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length > 1 && (
        <div className="carousel-dots">
          {articles.map((_, index) => (
            <span 
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;