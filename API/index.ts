import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000', // endereço da API Python
  timeout: 10000,
});

export default api;
