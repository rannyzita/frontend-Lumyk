import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.8:5000', // endereço da API Python
  timeout: 10000,
});

export default api;

// https://lumyk-backend.onrender.com