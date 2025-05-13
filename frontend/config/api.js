import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.17:3000/api', // ← update IP to your local IP if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
