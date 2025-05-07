import axios from 'axios';

// Creating an Axios instance
const axiosInstance_users = axios.create({
  baseURL: 'http://localhost:5000', // Adjust this to your backend server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance_users;