import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance_articles from '../axiosInstance_articles';
import EditArticle from '../components/EditArticle';
import DeleteArticle from '../components/DeleteArticle';
import '../styles/Article.css';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false);
  //get the user data from local storage and store it in a state variable
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  );

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance_articles.post('/article/getArticles', { "_id": id });
        
        if (!response.data) {
          throw new Error('Article not found');
        }
        console.log('Fetched article:', response.data);
        setArticle(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Cloudinary image optimization
  const getOptimizedBannerUrl = (url) => {
    if (!url) return '';
    if (url.includes('res.cloudinary.com')) {
      return url.replace('/upload/', '/upload/w_1200,h_600,c_fill,q_auto,f_auto/');
    }
    return url;
  };

  if (loading) {
    return (
      <div className="article-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-error">
        <h2>Error loading article</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Return to Homepage
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found">
        <h2>Article Not Found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="article-page">
      {/* Article Banner */}
      <div
        className="article-banner"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                          url(${getOptimizedBannerUrl(article.banner || article.imageUrl)})`
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">{article.title}</h1>
          <div className="banner-meta">
            <span className="publish-date">
              {new Date(article.publication_date || article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {article.last_update && (
              <span className="update-date">
                (Updated: {new Date(article.last_update).toLocaleDateString()})
              </span>
            )}
            {user.role === "admin" && (
              <div className='admin-actions'>
                <button className="editButton" onClick={() => setEditWindowOpen(true)}>
                  تعديل المقالة
                </button>
                <button className="deleteButton" onClick={() => setDeleteWindowOpen(true)}>
                  حذف المقالة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="article-container">
        <div className="article-content">
          <div className="article-body">
            {article.content}
          </div>

          <div className="article-footer">
            <div className="article-authors">
              <h3>الكاتبين</h3>
              <p>
                {Array.isArray(article.authors) 
                  ? article.authors.join(', ') 
                  : (article.authors || 'Unknown author')}
              </p>
            </div>

            {article.categories && (
              <div className="article-categories">
                <h3>التصنيفات</h3>
                <p>
                  {Array.isArray(article.categories)
                    ? article.categories.join(', ')
                    : article.categories}
                </p>
              </div>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="article-tags">
                <h3>العلامات</h3>
                <div className="tags-container">
                  {Array.isArray(article.tags)
                    ? article.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))
                    : <span className="tag">{article.tags}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit and Delete Windows (Modals) */}
      {editWindowOpen && (
        <EditArticle
          article={article}
          onClose={() => setEditWindowOpen(false)}
          onUpdate={() => {setEditWindowOpen(false);}}
        />
      )}
      {deleteWindowOpen && (
        <DeleteArticle
          articleId={article._id}
          onClose={() => setDeleteWindowOpen(false)}
          onDelete={() => {
            setDeleteWindowOpen(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default Article;