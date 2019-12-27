import axios from 'axios';


const instance = axios.create({
    baseURL:'https://insta-pages.firebaseio.com/'
});

export default instance;