import axios from 'axios';

const eurostatAPI = axios.create({
    baseURL: 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default eurostatAPI;
