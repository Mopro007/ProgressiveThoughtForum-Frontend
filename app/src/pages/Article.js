import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Article.css';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/article', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data) {
          throw new Error('Article not found');
        }
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="loading-message">Loading article...</div>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  if (!article) {
    return <h2 className="error-message">Article Not Found</h2>;
  }

  return (
    <div className="article-page">
      {/* Article Banner with Back Button */}
      <div
        className="article-banner"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), url(${article.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <button 
          className="back-to-home"
          onClick={() => navigate('/')}
        >
          ← Back to Homepage
        </button>
      </div>

      {/* Article Content */}
      <div className="article-content">
        <h2 className="article-title">{article.title}</h2>
        <h4 className="article-date">
          Published on: {new Date(article.publishDate).toLocaleDateString()}
        </h4>
        <div className="article-body">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <h4 className="article-authors">
          By: {Array.isArray(article.authors) ? article.authors.join(', ') : article.authors}
        </h4>
      </div>
    </div>
  );
};

export default Article;