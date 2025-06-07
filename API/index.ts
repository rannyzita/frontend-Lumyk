import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.7:5000', // endereço da API Python
  timeout: 10000,
});

export default api;
