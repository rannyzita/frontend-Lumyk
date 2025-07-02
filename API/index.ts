import axios from 'axios';

const api = axios.create({
  baseURL: ' http://192.168.23.141:5000', // endereço da API Python
  timeout: 10000,
});

export default api;
