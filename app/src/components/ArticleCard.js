import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article, size = 'normal' }) => {
  // Cloudinary image transformations based on card size
  const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    
    // Default transformations
    let transformations = 'q_auto,f_auto';
    
    // Size-specific transformations
    switch(size) {
      case 'double':
        transformations += ',w_600,h_400,c_fill';
        break;
      case 'triple':
        transformations += ',w_800,h_500,c_fill';
        break;
      case 'quad':
        transformations += ',w_1000,h_600,c_fill';
        break;
      default: // normal
        transformations += ',w_400,h_300,c_fill';
    }

    if (url.includes('res.cloudinary.com')) {
      return url.replace('/upload/', `/upload/${transformations}/`);
    }
    return url;
  };

  // Fallback to banner if imageUrl doesn't exist
  const imageUrl = article.banner || article.imageUrl;

  return (
    <div className={`article-card ${size}`}>
      <div
        className="article-banner"
        style={{ 
          backgroundImage: `url(${getOptimizedImageUrl(imageUrl)})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundClip: 'crop',
          backgroundPosition: 'center'
        }}
      >
        <div className="overlay"></div>
      </div>
      <div className="content">
        <h3 className="title">{article.title}</h3>
        <p className="brief">{article.brief}</p>
        <p className="authors">
          By: {Array.isArray(article.authors) ? article.authors.join(', ') : article.authors}
        </p>
        <Link to={`/article/${article._id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;