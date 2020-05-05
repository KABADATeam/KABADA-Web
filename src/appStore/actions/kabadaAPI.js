import axios from 'axios';

const kabadaAPI = axios.create({
    baseURL: 'https://localhost:5001/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default kabadaAPI;
