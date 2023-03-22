import axios from 'axios';

const eurostatAPI = axios.create({
    baseURL: 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/',
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // }
});

export default eurostatAPI;
