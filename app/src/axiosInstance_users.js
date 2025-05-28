import axios from 'axios';

// Creating an Axios instance
const axiosInstance_users = axios.create({
  baseURL: 'https://users-server-m48x.onrender.com', // Adjust this to your backend server's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance_users;