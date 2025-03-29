import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article , size = 'normal' }) => {
  return (
    <div className={`article-card ${size}`}>
      <div
        className="article-banner"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      >
        <div className="overlay"></div>
      </div>
      <div className="content">
        <h3 className="title">{article.title}</h3>
        <p className="brief">{article.brief}</p>
        <p className="authors">By: {article.authors.join(', ')}</p>
        <Link to={`/article/${article.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
