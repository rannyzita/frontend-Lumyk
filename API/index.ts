import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lumyk-backend.onrender.com', // endereço da API Python
  timeout: 10000,
});

export default api;

// https://lumyk-backend.onrender.com