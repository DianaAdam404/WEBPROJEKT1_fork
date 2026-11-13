import axios from 'axios';

//axios instance létrehozása a baseURL beállításával
const api = axios.create({  
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Engedélyezi a cookie-k küldését a kérésekkel
});


export default api;
