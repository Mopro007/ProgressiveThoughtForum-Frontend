import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Accountwidow from '../components/Accountwindow';
import Carousel from '../components/Carousel';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import PuplishWindow from '../components/puplishWindow';
import axiosInstance_users from '../axiosInstance_users';
import axiosInstance_articles from '../axiosInstance_articles';
import '../styles/HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([
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

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountWindowOpen, setAccountWindowOpen] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState(articles.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [puplishWindowVisible, setPuplishWindowVisible] = useState(false);

  //fetch user data from the local storage, if available
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserData(parsedData);
    }
    setLoading(false);
  }, []);

  //fetch articles from the server
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance_articles.post('/article/getArticles');
        if (response.status === 200) {
          console.log('Articles fetched successfully:', response.data);
          setArticles(response.data);
          setFilteredArticles(response.data.slice(0, visibleCount));
          setLoading(false);
        } else {
          console.error('Error fetching articles:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

//signIn function
const signIn = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  
  const newUserData = {
    email: email,
    password: password,
  };
  const response = await axiosInstance_users.post('/user/login', newUserData)
  if (response.status == 200) {
    console.log('User logged in successfully:', response.data);
    setUserData(response.data);
    localStorage.setItem('userData', JSON.stringify(response.data));
    setAccountWindowOpen(false);
  } else {
    console.error('Error logging in:', response.data);
    alert('Invalid email or password');
  }
};

// signUp function
const signUp = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  
  const newUserData = {
    name: name,
    email: email,
    password: password,
  };
  const response = await axiosInstance_users.post('/user/signup', newUserData)
  if (response.status == 201) {
    console.log('User signed up successfully:', response.data);
    setUserData(response.data);
    localStorage.setItem('userData', JSON.stringify(response.data));
    setAccountWindowOpen(false);
  } else {
    console.error('Error signing up:', response.data);
    alert('Error signing up. Please try again.');
  }
};

// signOut function
const signOut = () => {
  setUserData(null);
  localStorage.removeItem('userData');
  setAccountWindowOpen(false);
};

  // Handle account window open/close
  const accountWindowHandle = () => {
    setAccountWindowOpen(!accountWindowOpen);
  };

  // Handle the search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredArticles(articles.slice(0, visibleCount));
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  const showMoreArticles = () => {
    setVisibleCount(prevCount => {
      const newCount = prevCount + 10;
      setFilteredArticles(articles.slice(0, newCount));
      return newCount;
    });
  };

  //close the publish window
  const onClose = () => {
    setPuplishWindowVisible(false);
  };

  // Get first 5 articles for carousel
  const carouselArticles = articles.slice(0, 5);

  return (
    <div className="homepage">
      <Navbar accountWindowHandle={accountWindowHandle} />
      {accountWindowOpen && (
        <Accountwidow accountWindowHandle={accountWindowHandle} userData={userData} signOut={signOut} signIn={signIn} signUp={signUp} setPuplishWindowVisible={setPuplishWindowVisible}/>
      )}
      {puplishWindowVisible && (<PuplishWindow onClose={onClose} />)}

      <Carousel articles={carouselArticles} />

      <section id="about-us" className="about-us">
        <h2>نبذة عنا</h2>
        <p>
          نشأنا في بلدٍ أنهكته الصراعات والانقسامات، وتوارثت أجياله أنظمة سياسية واقتصادية لا تعتبر للإنسان قيمة تحتسب في إدارتها، ولا تولي للشباب أهمية كأداة أساسية للتجديد والتقدم.

          لكننا نؤمن أن هذا الواقع ليس قدراً.

          من هنا، تشكلت مجموعتنا: شباب طلاب وناشطون نحمل قناعة راسخة بأن التغيير يبدأ من الحرم الجامعي،من الشارع، ومن مساحات النقاش الحرة، ومن إعادة تعريف السياسة باعتبارها ممارسة تقوم على خدمة المصلحة العامة.

          تأسست هذه المجموعة كإطار شبابي مدني ديمقراطي، علماني، لا يسعى إلى الدخول في صراع السلطة أو المشاركة الانتخابية، بل يعمل على تعبئة الطاقات الشبابية وتنظيمها، ومواجهة السرديات الطائفية والخطابات الإقصائية، والسعي إلى إنتاج بدائل تنحاز فعلاً إلى مصالح الناس واحتياجاتهم، خارج منطق المحاصصة والولاءات الضيقة.
        </p>
      </section>

      <section id="articles" className="articles">
        <div className="articles-header">
          <h2>مقالاتنا</h2>
          <input
            type="text"
            placeholder="ابحث عن مقالات..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="articles-list">
          {filteredArticles.length === 0 ? (
            <p>لم يتم العثور على مقالة تطابق بحثك</p>
          ) : (
            filteredArticles.map((article) => {
              const sizes = ['normal', 'double', 'triple', 'quad'];
              const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
              
              return (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  size={randomSize} 
                />
              );
            })
          )}
        </div>
        {visibleCount < articles.length && (
          <button className="show-more-btn" onClick={showMoreArticles}>
            اضهر المزيد
          </button>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;