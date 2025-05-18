import React, { useState } from 'react';
import axios from 'axios';
import '../styles/puplishWindow.css';
import axiosInstance_articles from '../axiosInstance_articles';

const PublishWindow = ({ onClose }) => {
  const [formData, setFormData] = useState({
    bannerUrl: '',
    title: '',
    publication_date: new Date().toISOString(),
    last_update: new Date().toISOString(),
    brief: '',
    content: '',
    authors: [''],
    categories: [''],
    tags: [''],
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Please upload a banner image');
      return;
    }

    setIsUploading(true);
    
    try {
      // First upload the image to cloudinary
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);
      imageFormData.append('upload_preset', 'progressive thought forum');
      imageFormData.append('cloud_name', 'duvs84hsw');
      
      const imageResponse = await axios.post('https://api.cloudinary.com/v1_1/duvs84hsw/image/upload', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageUrl = imageResponse.data.secure_url;

      // Then publish the article with the image URL
      const currentDate = new Date().toISOString();
      const articleData = {
        ...formData,
        banner: imageUrl,
        title: formData.title,
        brief: formData.brief,
        content: formData.content,
        publication_date: currentDate,
        last_update: currentDate,
        authors: formData.authors.join(','),
        categories: formData.categories.join(','),
        tags: formData.tags.join(',')
      };

      const response = await axiosInstance_articles.post('/article', articleData);
      if (response.status === 200) {
        alert('Article published successfully!');
        console.log('Article published successfully:', response.data);
        onClose();
      } else if (response.status != 200) {
        alert('Failed to publish article. Please try again.');
      }
    } catch (error) {
      console.error('Error publishing article:', error);
      alert('Error publishing article. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="publish-window-overlay">
      <div className="publish-window">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>نشر مقالة جديدة</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Banner Image Upload */}
          <div className="form-group">
            <label>صورة الغلاف</label>
            <div className="image-upload-container">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  {isUploading ? 'Uploading...' : 'No image selected'}
                </div>
              )}
              <input
                type="file"
                id="bannerImage"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
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
            <label>المحتوى</label>
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
            <button type="submit" className="publish-btn" disabled={isUploading}>
              {isUploading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishWindow;