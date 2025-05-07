import axios from 'axios';

// Creating an Axios instance
const axiosInstance_articles = axios.create({
  baseURL: 'http://localhost:9000', // Adjust this to your backend server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance_articles;