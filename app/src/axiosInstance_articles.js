import axios from 'axios';

// Creating an Axios instance
const axiosInstance_articles = axios.create({
  baseURL: 'https://articles-server-aqm7.onrender.com', // Adjust this to your backend server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance_articles;