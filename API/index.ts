import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // endereço da API Python
  timeout: 10000,
});

export default api;
