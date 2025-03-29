import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([
    // Example articles (replace with actual articles data)
    { id: 1, title: 'Article 1', brief: 'This is a brief of article 1', category: 'tech', imageUrl: 'assets/article1.jpg', authors: ['Author 1', 'Author 2'] },
    { id: 2, title: 'Article 2', brief: 'This is a brief of article 2', category: 'business', imageUrl: 'assets/article2.jpg', authors: ['Author 3'] },
    { id: 3, title: 'Article 3', brief: 'This is a brief of article 3', category: 'lifestyle', imageUrl: 'assets/article3.jpg', authors: ['Author 4'] },
    { id: 4, title: 'Article 4', brief: 'This is a brief of article 4', category: 'tech', imageUrl: 'assets/article4.jpg', authors: ['Author 5', 'Author 6'] },
    { id: 5, title: 'Article 5', brief: 'This is a brief of article 5', category: 'business', imageUrl: 'assets/article5.jpg', authors: ['Author 7'] },
    { id: 6, title: 'Article 6', brief: 'This is a brief of article 6', category: 'lifestyle', imageUrl: 'assets/article6.jpg', authors: ['Author 8'] },
    { id: 7, title: 'Article 7', brief: 'This is a brief of article 7', category: 'tech', imageUrl: 'assets/article7.jpg', authors: ['Author 9', 'Author 10'] },
    { id: 8, title: 'Article 8', brief: 'This is a brief of article 8', category: 'business', imageUrl: 'assets/article8.jpg', authors: ['Author 11'] },
    { id: 9, title: 'Article 9', brief: 'This is a brief of article 9', category: 'lifestyle', imageUrl: 'assets/article9.jpg', authors: ['Author 12'] },
    { id: 10, title: 'Article 10', brief: 'This is a brief of article 10', category: 'tech', imageUrl: 'assets/article10.jpg', authors: ['Author 13', 'Author 14'] },
    { id: 11, title: 'Article 11', brief: 'This is a brief of article 11', category: 'business', imageUrl: 'assets/article11.jpg', authors: ['Author 15'] },
    { id: 12, title: 'Article 12', brief: 'This is a brief of article 12', category: 'lifestyle', imageUrl: 'assets/article12.jpg', authors: ['Author 16'] },
    { id: 13, title: 'Article 13', brief: 'This is a brief of article 13', category: 'tech', imageUrl: 'assets/article13.jpg', authors: ['Author 17', 'Author 18'] },
    { id: 14, title: 'Article 14', brief: 'This is a brief of article 14', category: 'business', imageUrl: 'assets/article14.jpg', authors: ['Author 19'] },
  ]);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle the search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="homepage">

      <Navbar onSearch={handleSearch} searchTerm={searchTerm}/>

      <Carousel articles={articles}/>

      <section id="about-us" className="about-us">
        <h2>About Us</h2>
        <p>Here’s a brief about the website or company.</p>
      </section>

      <section id="articles" className="articles">
        <h2>Our Articles</h2>
        <div className="articles-list">
          {filteredArticles.length === 0 ? (
            <p>No articles found matching your search.</p>
          ) : (
            (filteredArticles.map((article) => {
                // Assign random sizes (or you can assign based on some logic)
                const sizes = ['normal', 'double', 'triple', 'quad'];
                const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
                
                return (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    size={randomSize} 
                  />
                );
              }))
          )}
        </div>
        <button className="show-more-btn">Show More Articles</button>
      </section>

      <Footer />

    </div>
  );
};

export default HomePage;
