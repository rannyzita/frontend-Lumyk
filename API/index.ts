import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.6.193:5000', // endereço da API Python
  timeout: 10000,
});

export default api;
