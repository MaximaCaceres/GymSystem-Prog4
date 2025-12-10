import axios from 'axios';

const api = axios.create({
    // Forzamos la IP para evitar problemas de resolución en Windows
    baseURL: 'http://127.0.0.1:8000', 
});

export default api;