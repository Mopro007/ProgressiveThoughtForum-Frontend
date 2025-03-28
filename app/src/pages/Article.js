import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Article.css';

const Article = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <h2 className="error-message">Article Not Found</h2>;
  }

  return (
    <div className="article-page">
      <div
        className="article-banner"
        style={{ backgroundImage: `url(${article.banner})` }}
      />
      <div className="article-content">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-body">{article.content}</p>
        <p className="article-authors">By: {article.authors.join(', ')}</p>
      </div>
    </div>
  );
};

export default Article;
