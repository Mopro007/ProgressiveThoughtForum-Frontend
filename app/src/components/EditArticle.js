import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance_articles from '../axiosInstance_articles';
import '../styles/EditArticle.css';

const EditArticle = ({ article, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: article.title || '',
    bannerUrl: article.bannerUrl || '',
    content: article.content || '',
    brief: article.brief || '',
    authors: article.authors || [''],
    categories: article.categories || [''],
    tags: article.tags || [''],
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(article.bannerUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleListChange = (e, field, index) => {
    const newList = [...formData[field]];
    newList[index] = e.target.value;
    setFormData({ ...formData, [field]: newList });
  };

  const addListItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeListItem = (field, index) => {
    const newList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newList });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let bannerUrl = formData.bannerUrl;

      // If a new image was uploaded, send it to Cloudinary first
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        imageFormData.append('upload_preset', 'progressive thought forum');
        
        const imageResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/duvs84hsw/image/upload', 
          imageFormData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        bannerUrl = imageResponse.data.secure_url;
      }

      const currentDate = new Date().toISOString();
      const articleData = {
        _id: article._id,
        title: formData.title,
        content: formData.content,
        bannerUrl: bannerUrl,
        brief: formData.brief,
        authors: formData.authors.join(','),
        categories: formData.categories.join(','),
        tags: formData.tags.join(','),
        last_update: currentDate
      };

      const response = await axiosInstance_articles.put('/article', articleData);
      if (response.status === 200) {
        onUpdate();
        onClose();
      } else {
        setError(response.data?.error || 'Failed to update article');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to update article');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="edit-article-overlay">
      <div className="edit-article-window">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Edit Article</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          {/* Banner Image Upload */}
          <div className="form-group">
            <label>Banner Image</label>
            <div className="image-upload-container">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  {loading ? 'Uploading...' : 'No image selected'}
                </div>
              )}
              <input
                type="file"
                id="bannerImage"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
              />
              <label htmlFor="bannerImage" className="upload-btn">
                {previewImage ? 'Change Image' : 'Select Image'}
              </label>
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label>العنوان</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Brief */}
          <div className="form-group">
            <label>مختصر</label>
            <textarea
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label>محتو المقالة</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
            />
          </div>

          {/* Authors */}
          <div className="form-group">
            <label>الكاتبين</label>
            {formData.authors.map((author, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => handleListChange(e, 'authors', index)}
                  required
                />
                {formData.authors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem('authors', index)}
                    className="remove-item-btn"
                  >
                    −
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem('authors')}
              className="add-item-btn"
            >
              + اضافة كاتب
            </button>
          </div>

          {/* Categories */}
          <div className="form-group">
            <label>التصنيفات</label>
            {formData.categories.map((category, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => handleListChange(e, 'categories', index)}
                  required
                />
                {formData.categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem('categories', index)}
                    className="remove-item-btn"
                  >
                    −
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem('categories')}
              className="add-item-btn"
            >
              + اضافة تصنيف
            </button>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>العلامات</label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleListChange(e, 'tags', index)}
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem('tags', index)}
                    className="remove-item-btn"
                  >
                    −
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem('tags')}
              className="add-item-btn"
            >
              + اضافة علامة
            </button>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              الغاء
            </button>
            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;