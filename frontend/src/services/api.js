import axios from 'axios';

const api = axios.create({
  baseURL: 'https://stealth-a46a.onrender.com/api',
});

export default api;
