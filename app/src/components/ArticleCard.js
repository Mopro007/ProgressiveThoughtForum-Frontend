import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <div
        className="article-banner"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      >
        <div className="overlay"></div>
      </div>
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-brief">{article.brief}</p>
        <p className="article-authors">By: {article.authors.join(', ')}</p>
        <Link to={`/article/${article.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
