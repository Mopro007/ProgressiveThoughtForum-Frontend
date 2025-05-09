import React, { useState } from 'react';
import axiosInstance_articles from '../axiosInstance_articles';
import '../styles/DeleteArticle.css';

const DeleteArticle = ({ articleId, onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance_articles.delete('/article', {
        _id: articleId,
      });
      onDelete();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to delete article');
      console.error('Error deleting article:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="delete-article-modal">
      <div className="delete-article-content">
        <h2>Delete Article</h2>
        {error && <p className="error-message">{error}</p>}
        <p>Are you sure you want to delete this article?</p>
        <button onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteArticle;