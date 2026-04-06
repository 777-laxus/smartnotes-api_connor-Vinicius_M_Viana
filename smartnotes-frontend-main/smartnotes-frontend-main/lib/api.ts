import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/v1',
  withCredentials: true, // Crucial para enviar o cookie de volta
});

export default api;