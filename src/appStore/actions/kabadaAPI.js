import axios from 'axios';

const kabadaAPI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default kabadaAPI;
