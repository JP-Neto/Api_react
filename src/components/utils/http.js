import axios from "axios";

const apiLink = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 10000
});

export default apiLink